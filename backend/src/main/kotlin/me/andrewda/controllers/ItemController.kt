package me.andrewda.controllers

import me.andrewda.models.*
import me.andrewda.utils.query
import me.andrewda.utils.uploadImage

object ItemController {
    suspend fun create(item: NewItem) = query {
        val imageUrl = if (item.image != null) {
            uploadImage(item.image)
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
}
