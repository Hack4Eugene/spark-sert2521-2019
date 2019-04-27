package me.andrewda.handlers

import io.ktor.application.call
import io.ktor.auth.authenticate
import io.ktor.http.HttpStatusCode
import io.ktor.request.receiveOrNull
import io.ktor.routing.*
import kotlinx.coroutines.ensureActive
import me.andrewda.authentication.AuthLevel
import me.andrewda.authentication.JwtConfig
import me.andrewda.controllers.PaymentController
import me.andrewda.controllers.UserController
import me.andrewda.models.NewUser
import me.andrewda.utils.*

fun Route.user() {
    route("/users") {
        get {
            val users = UserController.findAll()
            call.respond(users.map { it.getApiResponse() })
        }

        post {
            val newUser = call.receiveOrNull<NewUser>() ?: throw MissingFields()

            if (newUser.isValid && newUser.isFormatted) {
                val user = UserController.create(newUser)
                val token = JwtConfig.makeToken(user)
                call.respond(mapOf("user" to user.getApiResponse(), "token" to token))
            } else {
                throw MissingFields()
            }
        }

        authenticate(optional = true) {
            get("/{username}") {
                val username = call.parameters["username"] ?: throw NotFound()
                val user = UserController.findByUsername(username) ?: throw NotFound()

                val authLevel = call.getAuthLevel(user)

                call.respond(user.getApiResponse(authLevel))
            }
        }

        authenticate {
            patch("/{username}") {
                val username = call.parameters["username"] ?: ""
                val newUser = call.receiveOrNull<NewUser>() ?: throw MissingFields()

                call.ensureAuthLevel(AuthLevel.SELF, username = username)

                val user = UserController.patch(username, newUser) ?: throw NotFound()

                call.respond(user.getApiResponse(AuthLevel.SELF))
            }

            get("/{username}/payments") {
                val username = call.parameters["username"] ?: ""
                val user = UserController.findByUsername(username) ?: throw NotFound()
                call.ensureAuthLevel(AuthLevel.SELF, user = user)

                val excluded = call.request.queryParameters.getAll("exclude") ?: emptyList()
                val payments = PaymentController.findByUser(user)

                call.respond(payments.map { it.getApiResponse(exclude = excluded) })
            }
        }
    }
}
