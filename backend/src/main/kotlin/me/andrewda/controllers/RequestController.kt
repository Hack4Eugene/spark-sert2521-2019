package me.andrewda.controllers

import me.andrewda.models.*
import me.andrewda.utils.query
import org.jetbrains.exposed.dao.EntityID

object RequestController {
    suspend fun create(request: NewRequest) = query {
        if (request.person == null || request.item == null) {
            return@query null
        }

        Request.new {
            personId = EntityID(request.person, People)
            itemId = EntityID(request.item, Items)

            if (request.quantity != null) {
                quantity = request.quantity
            }
        }
    }

    suspend fun patch(id: Int, newRequest: NewRequest) = query {
        val request = Request.findById(id) ?: return@query null

        if (newRequest.quantity != null) request.quantity = newRequest.quantity
        if (newRequest.funds != null) request.funds = newRequest.funds
        if (newRequest.ordered != null) request.ordered = newRequest.ordered
        if (newRequest.delivered != null) request.delivered = newRequest.delivered

        request
    }

    suspend fun delete(id: Int) = query {
        val request = Request.findById(id) ?: return@query false

        request.delete()
        true
    }

    suspend fun findAll() = query { Request.all().toList() }

    suspend fun findById(id: Int) = query { Request.findById(id) }

    suspend fun findByPerson(person: Person) = query { Request.find { Requests.person eq person.id }.toList() }
}
