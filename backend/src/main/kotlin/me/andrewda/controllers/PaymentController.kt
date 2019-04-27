package me.andrewda.controllers

import me.andrewda.models.*
import me.andrewda.utils.query

object PaymentController {
    suspend fun create(payment: NewPayment, paymentId: String, user: User, person: Person) = query {
        Payment.new {
            this.paymentId = paymentId

            amount = payment.amount ?: 0.0
            type = PaymentType.PERSON
            userId = user.id
            personId = person.id
        }
    }

    suspend fun create(payment: NewPayment, paymentId: String, user: User, request: Request) = query {
        Payment.new {
            this.paymentId = paymentId

            amount = payment.amount ?: 0.0
            type = PaymentType.REQUEST
            userId = user.id
            requestId = request.id
        }
    }

    suspend fun completePayment(paymentId: String) = query {
        val payment = Payment.find { Payments.paymentId eq paymentId }.firstOrNull() ?: return@query
        payment.status = PaymentStatus.COMPLETE

        println("Completing payment $paymentId")

        when (payment.type) {
            PaymentType.PERSON -> {
                val person = payment.person ?: return@query
                person.funds += payment.amount
            }
            PaymentType.REQUEST -> {
                println("Updating request")
                val request = payment.request ?: return@query
                request.funds += payment.amount
            }
        }
    }
}
