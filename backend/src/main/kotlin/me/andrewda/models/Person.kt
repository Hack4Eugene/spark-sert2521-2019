package me.andrewda.models

import com.google.gson.annotations.Expose
import me.andrewda.utils.Readable
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable

data class NewPerson(
    @Expose val name: String?,
    @Expose val image: String?,
    @Expose val bio: String?,
    @Expose val slug: String?,
    @Expose val funds: Double?
) {
    val isValid get() = !name.isNullOrBlank() && !slug.isNullOrBlank()
}

object People : IntIdTable() {
    val name = varchar("name", 20)
    val image = varchar("image", 40).nullable()
    val bio = text("bio")
    val slug = varchar("slug", 20).uniqueIndex()
    val funds = double("funds").default(0.0)
}

class Person(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<Person>(People)

    @Readable
    var name by People.name

    @Readable
    var image by People.image

    @Readable
    var bio by People.bio

    @Readable
    var slug by People.slug

    @Readable
    var funds by People.funds

    @Readable(deep = true)
    inline val totalCost get() =
        Request.find { Requests.person eq id }.fold(0.0) { acc, request -> acc + request.totalPrice }

    @Readable(deep = true)
    inline val totalFunded get() =
        Request.find { Requests.person eq id }.fold(0.0) { acc, request -> acc + request.funds } + funds
}
