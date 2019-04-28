package me.andrewda.controllers

import me.andrewda.models.*
import me.andrewda.utils.Database
import me.andrewda.utils.query
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.json.FuelJson

const val CLIENT_ID = "Client-ID ed5784d13d20f95"

object ItemController {
    suspend fun create(item: NewItem) = query {
        val imageUrl = if (item.image != null) {
            val image = uploadImage(item.image)
            if (image != null) {
                image
            } else {
                println("Warning: Uploading to Imgur failed!")
                null
            }
        } else {
            null
        }

        Item.new {
            name = item.name ?: ""
            image = imageUrl
            price = item.price ?: 0.0
            inventory = item.inventory
        }
    }

    suspend fun patch(id: Int, newItem: NewItem) = query {
        val item = Item.findById(id) ?: return@query null

        if (newItem.name != null) item.name = newItem.name
        if (newItem.price != null) item.price = newItem.price
        if (newItem.inventory != null) item.inventory = newItem.inventory
        if (newItem.image != null) {
            item.image = uploadImage(newItem.image)
        }

        item
    }

    suspend fun delete(id: Int) = query {
        val item = Item.find { Items.id eq id }.firstOrNull() ?: return@query false

        // Get requests of this type
        val requests = Request.find { Requests.item eq id }

        for (request in requests) {
            request.delete()
        }
        item.delete()
        true
    }

    suspend fun findAll() = query { Item.all().toList() }

    suspend fun findById(id: Int) = query { Item.findById(id) }

    private fun uploadImage(imageBlob: String): String? {
        val response = Fuel.post("https://api.imgur.com/3/upload", listOf("image" to imageBlob, "type" to "base64")).also {
            it.headers.append("Authorization", CLIENT_ID)
        }.response().second.body().asString("application/json")
        val json = FuelJson(response).obj()
        if (json.getBoolean("success")) {
            return json.getJSONObject("data").getString("link")
        } else {
            return null
        }
    }
}
