package me.andrewda.handlers

import com.paypal.api.payments.Payment
import io.ktor.application.call
import io.ktor.request.receiveOrNull
import io.ktor.routing.Route
import io.ktor.routing.post
import io.ktor.routing.route
import me.andrewda.payment.PayPal
import me.andrewda.payment.PaymentRequest

fun Route.payment() {
    route("/payment") {
        post {
            with(call.receiveOrNull<PaymentRequest>()) {
                if (this != null) {
                    when (method) {
                        PaymentRequest.Method.PAYPAL -> {
                            PayPal.createPayment(cost)
                        }
                    }
                }
            }
        }
    }
}