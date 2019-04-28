package me.andrewda.controllers

import me.andrewda.models.*
import me.andrewda.utils.MissingFields
import me.andrewda.utils.query
import me.andrewda.utils.uploadImage

object PersonController {
    suspend fun create(person: NewPerson) = query {
        val imageUrl = if (person.image != null) {
            uploadImage(person.image)
        } else {
            null
        }

        Person.new {
            name = person.name ?: throw MissingFields()
            image = imageUrl
            bio = person.bio ?: ""
            slug = person.slug ?: throw MissingFields()
        }
    }

    suspend fun patch(slug: String, newPerson: NewPerson) = query {
        val person = Person.find { People.slug eq slug }.firstOrNull() ?: return@query null

        if (newPerson.name != null) person.name = newPerson.name
        if (newPerson.bio != null) person.bio = newPerson.bio
        if (newPerson.slug != null) person.slug = newPerson.slug
        if (newPerson.funds != null) person.funds = newPerson.funds
        if (newPerson.image != null) {
            val imageUrl = if (person.image != null) {
                uploadImage(newPerson.image)
            } else {
                null
            }

            person.image = imageUrl
        }

        person
    }

    suspend fun delete(slug: String) = query {
        val person = Person.find { People.slug eq slug }.firstOrNull() ?: return@query false

        // Get requests related to this person
        val requests = Request.find { Requests.person eq person.id }

        for (request in requests) {
            request.delete()
        }
        person.delete()
        true
    }

    suspend fun findAll() = query { Person.all().toList() }

    suspend fun findById(id: Int) = query { Person.findById(id) }

    suspend fun findBySlug(slug: String) = query { Person.find { People.slug eq slug }.firstOrNull() }
}
