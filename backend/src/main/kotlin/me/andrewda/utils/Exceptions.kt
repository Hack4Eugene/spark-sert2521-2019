package me.andrewda.utils

import io.ktor.http.HttpStatusCode

open class ExceptionWithStatus(
    message: String? = null,
    val status: HttpStatusCode = HttpStatusCode.InternalServerError
) : Exception(message ?: status.description)

class InvalidCredential : ExceptionWithStatus("Username or password is incorrect", HttpStatusCode.Unauthorized)
class NotAuthenticated : ExceptionWithStatus("Please login to continue", HttpStatusCode.Unauthorized)
class Forbidden : ExceptionWithStatus("Insufficient permissions", HttpStatusCode.Forbidden)
class MissingFields : ExceptionWithStatus("Some required fields are missing", HttpStatusCode.BadRequest)
class NotFound : ExceptionWithStatus(status = HttpStatusCode.NotFound)
class InternalServerError : ExceptionWithStatus(status = HttpStatusCode.InternalServerError)
