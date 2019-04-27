package me.andrewda.models

import com.google.gson.annotations.Expose
import me.andrewda.utils.Readable
import org.jetbrains.exposed.dao.*

enum class PaymentType {
    REQUEST, PERSON
}

enum class PaymentStatus {
    PENDING, COMPLETE, ERROR
}

data class NewPayment(
    @Expose val amount: Double?
) {
    val isValid get() = amount != null
}

object Payments : IntIdTable() {
    val paymentId = varchar("paymentId", 40)
    val amount = double("amount")
    val user = entityId("user", Users).nullable()
    val request = entityId("request", Requests).nullable()
    val person = entityId("person", People).nullable()
    val type = enumeration("type", PaymentType::class)
    val status = enumeration("status", PaymentStatus::class).default(PaymentStatus.PENDING)
}

class Payment(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<Payment>(Payments)

    @Readable
    var paymentId by Payments.paymentId

    @Readable
    var userId by Payments.user

    @Readable
    var requestId by Payments.request

    @Readable
    var personId by Payments.person

    @Readable
    var amount by Payments.amount

    @Readable
    var type by Payments.type

    @Readable
    var status by Payments.status

    @Readable(deep = true)
    inline val user get() = User.findById(userId?.value ?: 0)

    @Readable(deep = true)
    inline val request get() = Request.findById(requestId?.value ?: 0)

    @Readable(deep = true)
    inline val person get() = Person.findById(personId?.value ?: 0)
}
