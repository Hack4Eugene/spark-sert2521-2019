package me.andrewda.handlers

import io.ktor.application.call
import io.ktor.auth.authenticate
import io.ktor.request.receiveOrNull
import io.ktor.routing.*
import io.netty.handler.codec.http.HttpResponseStatus
import me.andrewda.authentication.AuthLevel
import me.andrewda.controllers.PaymentController
import me.andrewda.controllers.PersonController
import me.andrewda.controllers.RequestController
import me.andrewda.models.NewPerson
import me.andrewda.models.NewRequest
import me.andrewda.utils.*

fun Route.person() {
    route("/people") {
        get {
            val people = PersonController.findAll()
            call.respond(people.map { it.getDeepApiResponse() })
        }

        get("/{slug}") {
            val slug = call.parameters["slug"] ?: throw NotFound()
            val person = PersonController.findBySlug(slug) ?: throw NotFound()

            call.respond(person.getDeepApiResponse())
        }

        get("/{slug}/requests") {
            val slug = call.parameters["slug"] ?: throw NotFound()
            val excluded = call.request.queryParameters.getAll("exclude") ?: emptyList()
            val person = PersonController.findBySlug(slug) ?: throw NotFound()
            val requests = RequestController.findByPerson(person)

            call.respond(requests.map { it.getDeepApiResponse(exclude = excluded) })
        }

        post("/{slug}/requests") {
            val slug = call.parameters["slug"] ?: throw NotFound()
            val excluded = call.request.queryParameters.getAll("exclude") ?: emptyList()
            val newRequests = call.receiveOrNull<Array<NewRequest>>() ?: throw MissingFields()
            val person = PersonController.findBySlug(slug) ?: throw NotFound()

            val requests = RequestController.createSeveral(newRequests.toList(), person)

            call.respond(requests.map { it.getDeepApiResponse(exclude = excluded) })
        }

        authenticate {
            get("/{slug}/payments") {
                call.ensureAuthLevel(AuthLevel.SELF)
                val slug = call.parameters["slug"] ?: throw NotFound()
                val person = PersonController.findBySlug(slug) ?: throw NotFound()
                val excluded = call.request.queryParameters.getAll("exclude") ?: emptyList()
                val payments = PaymentController.findByPerson(person)

                call.respond(payments.map { it.getApiResponse(exclude = excluded) })
            }
            
            post {
                val newPerson = call.receiveOrNull<NewPerson>() ?: throw MissingFields()

                if (newPerson.isValid) {
                    val request = PersonController.create(newPerson)

                    call.respond(request.getDeepApiResponse())
                } else {
                    throw MissingFields()
                }
            }

            patch("/{slug}") {
                val slug = call.parameters["slug"] ?: throw NotFound()
                val newPerson = call.receiveOrNull<NewPerson>() ?: throw MissingFields()

                val person = PersonController.patch(slug, newPerson) ?: throw NotFound()

                call.respond(person.getDeepApiResponse())
            }

            delete("/{slug}") {
                call.ensureAuthLevel(AuthLevel.ADMIN)
                val slug = call.parameters["slug"] ?: throw NotFound()

                if (PersonController.delete(slug)) {
                    call.respond(HttpResponseStatus.OK)
                } else {
                    throw NotFound()
                }
            }
        }
    }
}
