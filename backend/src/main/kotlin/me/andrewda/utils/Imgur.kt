package me.andrewda.utils

import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.json.FuelJson

private const val CLIENT_ID = "Client-ID ed5784d13d20f95"
private const val ENDPOINT = "https://api.imgur.com/3/upload"

fun uploadImage(imageBlob: String): String? {
    val response = Fuel.post(ENDPOINT, listOf("image" to imageBlob, "type" to "base64")).also {
        it.headers.append("Authorization", CLIENT_ID)
    }.response().second.body().asString("application/json")
    val json = FuelJson(response).obj()

    return if (json.getBoolean("success")) {
        json.getJSONObject("data").getString("link")
    } else {
        null
    }
}
