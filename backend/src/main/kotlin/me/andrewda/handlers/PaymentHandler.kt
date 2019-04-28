package me.andrewda.handlers

import io.ktor.application.call
import io.ktor.request.receiveOrNull
import io.ktor.response.respondRedirect
import io.ktor.routing.Route
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.route
import me.andrewda.controllers.PaymentController
import me.andrewda.controllers.PersonController
import me.andrewda.controllers.RequestController
import me.andrewda.models.NewPayment
import me.andrewda.payment.PayPal
import me.andrewda.utils.*

fun Route.payment() {
    route("/payments") {
        route("/people") {
            post("/{slug}") {
                val slug = call.parameters["slug"] ?: throw NotFound()
                val newPayment = call.receiveOrNull<NewPayment>() ?: throw MissingFields()
                val user = call.getUser()

                val person = PersonController.findBySlug(slug) ?: throw NotFound()

                val amount = newPayment.amount ?: throw InvalidAmount()

                if (amount <= 0) throw InvalidAmount()

                if (newPayment.isValid) {
                    val payment = PayPal.createPayment(amount) ?: throw MissingFields()
                    val link = payment.links.find { it.rel == "approval_url" }?.href ?: throw InternalServerError()

                    try {
                        PaymentController.create(newPayment, payment.id, user, person)
                    } catch (exception: Exception) {
                        throw PaymentFailure()
                    }
                    call.respond(mapOf("link" to link))
                } else {
                    throw MissingFields()
                }
            }
        }

        route("/requests") {
            post("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull() ?: throw NotFound()
                val newPayment = call.receiveOrNull<NewPayment>() ?: throw MissingFields()
                val user = call.getUser()

                val request = RequestController.findById(id) ?: throw NotFound()

                val amount = newPayment.amount ?: throw InvalidAmount()

                if (amount <= 0) throw InvalidAmount()

                if (newPayment.isValid) {
                    val payment = PayPal.createPayment(amount) ?: throw MissingFields()
                    val link = payment.links.find { it.rel == "approval_url" }?.href ?: throw InternalServerError()

                    try {
                        PaymentController.create(newPayment, payment.id, user, request)
                    } catch (exception: Exception) {
                        throw PaymentFailure()
                    }

                    call.respond(mapOf("link" to link))
                } else {
                    throw MissingFields()
                }
            }
        }

        get("/return") {
            val paymentId = call.request.queryParameters["paymentId"] ?: ""
            val payerId = call.request.queryParameters["PayerID"] ?: ""

            val amount = try {
                PayPal.executePayment(paymentId, payerId).transactions.firstOrNull()?.amount?.total ?: "0.00"
            } catch (exception: Exception) {
                throw PaymentFailure()
            }

            PaymentController.completePayment(paymentId)

            val payment = PaymentController.findByPaymentId(paymentId) ?: throw PaymentFailure()
            val person = query { payment.person ?: throw PaymentFailure() }

            call.respondRedirect("/payment/success?amount=$amount&to=${person.name}")
        }
    }
}
