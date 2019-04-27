package me.andrewda.handlers

import io.ktor.application.call
import io.ktor.auth.authenticate
import io.ktor.http.HttpStatusCode
import io.ktor.request.receiveOrNull
import io.ktor.routing.*
import me.andrewda.authentication.AuthLevel
import me.andrewda.controllers.RequestController
import me.andrewda.models.NewRequest
import me.andrewda.utils.*

fun Route.request() {
    route("/requests") {
        get {
            val requests = RequestController.findAll()
            val excluded = call.request.queryParameters.getAll("exclude") ?: emptyList()

            call.respond(requests.map { it.getDeepApiResponse(exclude = excluded) })
        }

        get("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: throw NotFound()
            val excluded = call.request.queryParameters.getAll("exclude") ?: emptyList()
            val request = RequestController.findById(id) ?: throw NotFound()

            call.respond(request.getDeepApiResponse(exclude = excluded))
        }

        authenticate {
            post {
                val newRequest = call.receiveOrNull<NewRequest>() ?: throw MissingFields()

                if (newRequest.isValid) {
                    val request = RequestController.create(newRequest) ?: throw MissingFields()

                    call.respond(request.getDeepApiResponse())
                } else {
                    throw MissingFields()
                }
            }

            patch("/{id}") {
                val id = (call.parameters["id"] ?: "").toIntOrNull() ?: return@patch
                val newRequest = call.receiveOrNull<NewRequest>() ?: throw MissingFields()

                val request = RequestController.patch(id, newRequest) ?: throw NotFound()

                call.respond(request.getDeepApiResponse())
            }

            delete("/{id}") {
                call.ensureAuthLevel(AuthLevel.ADMIN)
                val id = (call.parameters["id"] ?: "").toIntOrNull() ?: throw NotFound()

                if (RequestController.delete(id)) {
                    call.respond(HttpStatusCode.OK)
                } else {
                    throw NotFound()
                }
            }
        }
    }
}
