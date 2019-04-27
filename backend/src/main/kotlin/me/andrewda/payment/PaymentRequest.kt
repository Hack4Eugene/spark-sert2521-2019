package me.andrewda.payment

interface PaymentRequest {
    enum class Method {
        PAYPAL, STRIPE
    }
    
    val method: Method
    val cost: Double
}
