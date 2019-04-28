package me.andrewda.utils

import com.zaxxer.hikari.HikariDataSource
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import me.andrewda.authentication.AuthLevel
import me.andrewda.authentication.hashPassword
import me.andrewda.models.*
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.exposedLogger
import org.jetbrains.exposed.sql.transactions.TransactionManager
import org.jetbrains.exposed.sql.transactions.transaction
import java.sql.Connection

object Database {
    private val databaseConfig = javaClass.getResource("/db.txt")

    private val envHost = System.getenv("DATABASE_HOST") ?: ""
    private val envUser = System.getenv("DATABASE_USER") ?: ""
    private val envPassword = System.getenv("DATABASE_PASSWORD") ?: ""
    private val envDatabase = System.getenv("DATABASE_NAME") ?: ""
    private val envPort = System.getenv("DATABASE_PORT") ?: ""

    private val url = when {
        envDatabase.isNotEmpty() -> "mysql://$envUser:$envPassword@$envHost:$envPort/$envDatabase"
        databaseConfig != null -> databaseConfig.readText().trim()
        else -> {
            exposedLogger.warn("Could not find db.txt, falling back to default address")
            "mysql://root:root@localhost:3306/ktor-app"
        }
    }

    val ds = HikariDataSource().apply {
        jdbcUrl = "jdbc:$url"
    }

    val connection = Database.connect(ds)

    fun init() {
        val transaction = TransactionManager.currentOrNew(Connection.TRANSACTION_REPEATABLE_READ)

        SchemaUtils.createMissingTablesAndColumns(Users, Items, Requests, People, Payments)
        createAdminAccount()

        transaction.commit()

        println("Database initiated")
    }

    private inline fun createAdminAccount() {
        val adminUser = User.find { Users.username eq "admin" }.firstOrNull()

        if (adminUser == null) {
            User.new {
                name = "Admin McAdminface"
                username = "admin"
                email = "admin@sert2521.org"
                password = hashPassword("sert2521")
                authLevel = AuthLevel.ADMIN
            }
        }
    }
}

suspend fun <T> query(block: () -> T): T = withContext(Dispatchers.IO) {
    transaction { block() }
}
