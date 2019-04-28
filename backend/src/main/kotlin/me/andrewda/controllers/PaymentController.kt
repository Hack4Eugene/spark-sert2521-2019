package me.andrewda.controllers

import me.andrewda.models.*
import me.andrewda.utils.PaymentFailure
import me.andrewda.utils.query

object PaymentController {
    suspend fun create(payment: NewPayment, paymentId: String, user: User?, person: Person) = query {
        Payment.new {
            this.paymentId = paymentId

            amount = payment.amount ?: 0.0
            type = PaymentType.PERSON
            personId = person.id
            userId = user?.id
        }
    }

    suspend fun create(payment: NewPayment, paymentId: String, user: User?, request: Request) = query {
        Payment.new {
            this.paymentId = paymentId

            amount = payment.amount ?: 0.0
            type = PaymentType.REQUEST
            personId = request.personId
            requestId = request.id
            userId = user?.id
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

    suspend fun findByUser(user: User) = query {
        Payment.find { Payments.user eq user.id }.toList()
    }

    suspend fun findByPaymentId(paymentId: String) = query {
        Payment.find { Payments.paymentId eq paymentId }.firstOrNull()
    }

    suspend fun findByPerson(person: Person) = query {
        Payment.find {
            Payments.person eq person.id
        }.toList()
    }
}
