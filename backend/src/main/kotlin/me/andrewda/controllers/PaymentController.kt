package me.andrewda.controllers

import me.andrewda.models.*
import me.andrewda.utils.PaymentFailure
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
        val payment = Payment.find { Payments.paymentId eq paymentId }.firstOrNull() ?: throw PaymentFailure()

        if (payment.status != PaymentStatus.PENDING) {
            throw PaymentFailure()
        }

        payment.status = PaymentStatus.COMPLETE

        when (payment.type) {
            PaymentType.PERSON -> {
                val person = payment.person ?: throw PaymentFailure()
                person.funds += payment.amount
            }
            PaymentType.REQUEST -> {
                val request = payment.request ?: throw PaymentFailure()
                request.funds += payment.amount
            }
        }
    }
}
