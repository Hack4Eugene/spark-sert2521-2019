package me.andrewda.handlers

import io.ktor.application.call
import io.ktor.auth.authenticate
import io.ktor.request.receiveOrNull
import io.ktor.routing.*
import io.netty.handler.codec.http.HttpResponseStatus
import me.andrewda.authentication.AuthLevel
import me.andrewda.controllers.PersonController
import me.andrewda.controllers.RequestController
import me.andrewda.models.NewPerson
import me.andrewda.models.NewRequest
import me.andrewda.utils.*

fun Route.person() {
    route("/people") {
        get {
            val people = PersonController.findAll()
            call.respond(people.map { it.getApiResponse() })
        }

        get("/{slug}") {
            val slug = call.parameters["slug"] ?: throw NotFound()
            val person = PersonController.findBySlug(slug) ?: throw NotFound()

            call.respond(person.getApiResponse())
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
            post {
                val newPerson = call.receiveOrNull<NewPerson>() ?: throw MissingFields()

                if (newPerson.isValid) {
                    val request = PersonController.create(newPerson)

                    call.respond(request.getApiResponse())
                } else {
                    throw MissingFields()
                }
            }

            patch("/{slug}") {
                val slug = call.parameters["slug"] ?: throw NotFound()
                val newPerson = call.receiveOrNull<NewPerson>() ?: throw MissingFields()

                val person = PersonController.patch(slug, newPerson) ?: throw NotFound()

                call.respond(person.getApiResponse())
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
