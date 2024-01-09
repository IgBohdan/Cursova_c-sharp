using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Text.Json;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Linq;
using MongoDB.Bson.Serialization.IdGenerators;

public class OrderModel
{   public string UserId { get; set; }
    public string Location { get; set; }
    public List<OrderItemModel> OrderItems { get; set; }
}


public class CategoryModel
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string BusinesId { get; set; }
}
public class OrderItemModel
{
    public string ItemId { get; set; }
    public int Quantity { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Price { get; set; }
    public string StoreName { get; set; }
    public string StoreCity { get; set; }
    public string StoreAddress { get; set; }
}
    
public class CuryerAccept
{
    [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
    public string ID { get; set; }
    public string Description { get; set; }
    public bool Accept { get; set; }
}

public class PartnerModel
{
    public string _id { get; set; }
    public string BusinessName { get; set; }
    public bool IsAdmin { get; set; }
}

public class CompleteOrderRequest
{
    public string OrderId { get; set; }
    public string CourierId { get; set; }
    public bool IsCompleted { get; set; }
}

public class HomeController : Controller
{
    private readonly IMongoCollection<BsonDocument> collection;
    private readonly IMongoCollection<BsonDocument> collection2;
    private readonly IMongoCollection<BsonDocument> PartnerCollection;
    private readonly IMongoCollection<BsonDocument> CategoryCollection;
    private readonly IMongoCollection<BsonDocument> StoryIteams;
    private readonly IMongoCollection<BsonDocument> Orders;
    private readonly IMongoCollection<BsonDocument> Curers;
    public HomeController()
    {
        string connectionString = "mongodb://localhost:27017";
        MongoClient client = new MongoClient(connectionString);
        IMongoDatabase database = client.GetDatabase("Cursova_c-sharp");
        collection = database.GetCollection<BsonDocument>("heelp");
        collection2 = database.GetCollection<BsonDocument>("heelp2");
        PartnerCollection = database.GetCollection<BsonDocument>("PartnerCollection");
        CategoryCollection = database.GetCollection<BsonDocument>("CategoryCollection"); 
        StoryIteams = database.GetCollection<BsonDocument>("StoryIteams");
        Orders = database.GetCollection<BsonDocument>("Orders");
        Curers = database.GetCollection<BsonDocument>("Curers");

    }

    [HttpGet("gettext2")]
    public IActionResult GetLastTimestamp()
    {
        var sortDefinition = Builders<BsonDocument>.Sort.Descending("timestamp");
        var lastDocument = collection.Find(new BsonDocument()).Sort(sortDefinition).FirstOrDefault();

        if (lastDocument != null)
        {
            var lastTimestamp = lastDocument["timestamp"].ToUniversalTime();
            return Content("last date in db: " + lastTimestamp, "text/plain");
        }
        else
        {
            return Content("no data.", "text/plain");
        }
    }

    [HttpGet("text")]
    public IActionResult AddText()
    {
        string text = "new line add to MongoDB";
        DateTime currentTime = DateTime.Now;
        var document = new BsonDocument
        {
            { "text", text },
            { "timestamp", currentTime }
        };
        collection2.InsertOne(document);

        return Content("line add wihh date " + currentTime, "text/plain");
    }

    [Route("api/action")]
    public IActionResult YourAction()
    {
        string AcceptPolicy = HttpContext.Request.Form["AcceptPolicy"];
        string BusinessName = HttpContext.Request.Form["BusinessName"];
        string City = HttpContext.Request.Form["City"];
        string Password = HttpContext.Request.Form["Password"];
        string EstablishmentType = HttpContext.Request.Form["EstablishmentType"];
        string PhoneNumber = HttpContext.Request.Form["PhoneNumber"];
        string partnerEmail = HttpContext.Request.Form["partnerEmail"];
        string PartnerName = HttpContext.Request.Form["PartnerName"];
        var document = new BsonDocument
            {
                { "BusinessName", BusinessName },
                { "Password", Password },
                { "partnerEmail", partnerEmail },
                { "PartnerName", PartnerName },
                { "PhoneNumber", PhoneNumber },
                { "City", City },
                { "EstablishmentType", EstablishmentType },
                { "AcceptPolicy", AcceptPolicy }
            };
        PartnerCollection.InsertOne(document);
        return Ok(true);
    }


    [HttpGet("getPartners")]
    public IActionResult GetPartners()
    {
        try
        {
            var Partners = PartnerCollection.Find(new BsonDocument()).ToEnumerable();

            var jsonPartners = Partners.Select(doc => new
            {
                _id = doc["_id"].ToString(),
                BusinessName = doc["BusinessName"].AsString,
                partnerEmail = doc["partnerEmail"].AsString,
                PhoneNumber = doc["PhoneNumber"].AsString,
                City = doc["City"].AsString,
                EstablishmentType = doc["EstablishmentType"].AsString,
            }).ToList();
            return Ok(jsonPartners);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error fetching items: {ex.Message}");
            return Ok(new { Success = false, Message = "Error fetching items" });
        }
    }

    

    [HttpPost("login")]
    public IActionResult loginaction()
    {
        string login = HttpContext.Request.Form["login"];
        string password = HttpContext.Request.Form["password"];
        var filter = Builders<BsonDocument>.Filter.Eq("partnerEmail", login) & Builders<BsonDocument>.Filter.Eq("Password", password);
        var user = PartnerCollection.Find(filter).FirstOrDefault();

        if (user != null)
        {
            var businessId = user["_id"].ToString();
            var businessName = user["BusinessName"].ToString();

            var result = new
            {
                Success = true,
                BusinessId = businessId,
                BusinessName = businessName
            };

            return Ok(result);
        }
        else
        {
            return Ok(new { Success = false });
        }
    }

    [HttpPost("createCategory")]
    public IActionResult CreateCategory()
    {
        string Name = HttpContext.Request.Form["Name"];
        string Description = HttpContext.Request.Form["Description"];
        string BusinesId = HttpContext.Request.Form["BusinesId"];

        try
        {
            var document = new BsonDocument
        {
            { "Name", Name },
            { "Description",Description },
            {"BusinesId", BusinesId},
        };

            CategoryCollection.InsertOne(document);
            return Ok(new { Success = true, Message = "Category created successfully" });
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error creating category: {ex.Message}");
            return Ok(new { Success = false, Message = "Error creating category" });
        }
    }

    [HttpGet("getCategories")]
    public IActionResult GetCategories()
    {
        try
        {
            var categories = CategoryCollection.Find(new BsonDocument()).ToEnumerable();
            var jsonCategories = categories.Select(doc => doc.ToJson());
            return Ok(jsonCategories);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error fetching categories: {ex.Message}");

            return Ok(new { Success = false, Message = "Error fetching categories" });
        }
    }

    [HttpPut("editCategory/{categoryId}")]
    public IActionResult EditCategory(string categoryId, [FromBody] CategoryModel updatedCategoryModel)
    {
        var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(categoryId));
        var update = Builders<BsonDocument>.Update
            .Set("Name", updatedCategoryModel.Name)
            .Set("Description", updatedCategoryModel.Description)
            .Set("BusinesId", updatedCategoryModel.BusinesId);
        CategoryCollection.UpdateOne(filter, update);
        return Ok(true);
    }
    [HttpDelete("deleteCategory/{categoryId}")]
    public IActionResult DeleteCategory(string categoryId)
    {
        var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(categoryId));
        CategoryCollection.DeleteOne(filter);
        return Ok(true);
    }

    [HttpPost("createItem")]
    public IActionResult CreateItem()
    {
        string Name = HttpContext.Request.Form["name"];
        string Description = HttpContext.Request.Form["description"];
        string Price = HttpContext.Request.Form["price"];
        string Category = HttpContext.Request.Form["category"];
        string DateAdded = HttpContext.Request.Form["dateAdded"];
        string Photos = HttpContext.Request.Form["photos"];
        string BusinesId = HttpContext.Request.Form["BusinesId"];
        string BusinesName = HttpContext.Request.Form["BusinesName"];
        string Amount = HttpContext.Request.Form["Amount"];
        Console.WriteLine("Hello pups");
        Console.WriteLine(Amount);

        try
        {
            if (!int.TryParse(Price, out int price))
            {
                return Ok(new { Success = false, Message = "Invalid price value" });
            }

            if (!int.TryParse(Amount, out int amount))
            {
                return Ok(new { Success = false, Message = "Invalid amount value" });
            }

            var document = new BsonDocument
        {
            {"Name", Name},
            {"Description", Description},
            {"Price", price},
            {"Category", Category},
            {"DateAdded", DateAdded},
            {"Photos", Photos},
            {"BusinesId", BusinesId},
            {"BusinesName", BusinesName},
            {"Amount", amount},
        };

            StoryIteams.InsertOne(document);
            return Ok(new { Success = true, Message = "Category created successfully" });
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error creating category: {ex.Message}");
            return Ok(new { Success = false, Message = "Error creating category" });
        }
    }



[HttpGet("getOrders/{userId}")]
public IActionResult GetOrders(string userId)
{
    try
    {
            Console.WriteLine(userId);
   
        if (string.IsNullOrEmpty(userId))
        {
            return BadRequest("Invalid user ID");
        }

        var ordersCursor = Orders.Find(new BsonDocument()).ToEnumerable();
        var jsonOrders = ordersCursor
            .Where(doc => doc["idClient"].AsString == userId)
            .Select(doc => new
            {
                _id = doc["_id"].ToString(),
                IsProcessing = doc["IsProcessing"].ToString(),
                Completed = doc["Completed"].ToString(),
                IsActive = doc["IsActive"].ToString(),
                OrderItems = GetOrderItemsDetails(doc["OrderItems"]),
            })
            .ToList();

        return Ok(jsonOrders);
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error fetching orders: {ex.Message}");
        return Ok(new { Success = false, Message = "Error fetching orders" });
    }
}




private List<OrderItemModel> GetOrderItemsDetails(BsonValue orderItems)
{
    var orderItemsList = new List<OrderItemModel>();
    if (orderItems is BsonArray orderItemsArray)
    {
        foreach (var orderItemId in orderItemsArray)
        {
            if (orderItemId is BsonDocument orderItemDocument)
            {
                var orderItemIdString = orderItemDocument.GetValue("ItemId", "").ToString();
                if (!ObjectId.TryParse(orderItemIdString, out _))
                {
                    Console.Error.WriteLine($"Invalid orderItemId: {orderItemIdString}");
                    continue;
                }
                var filterStoryIteams = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(orderItemIdString));
                var storyIteam = StoryIteams.Find(filterStoryIteams).FirstOrDefault();
                if (storyIteam != null)
                {
                    var businessId = storyIteam.GetValue("BusinesId", "").ToString();
                    var filterStore = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(businessId));
                    var store = PartnerCollection.Find(filterStore).FirstOrDefault();

                    if (store != null)
                    {
                        var orderItem = new OrderItemModel
                        {
                            ItemId = storyIteam["_id"].ToString(),
                            Quantity = orderItemDocument.GetValue("Quantity", 0).AsInt32,
                            Name = storyIteam["Name"].AsString,
                            Description = storyIteam["Description"].AsString,
                            Price = storyIteam["Price"].AsInt32,
                            StoreName = store["BusinessName"].AsString,
                            StoreCity = store["City"].AsString,
                            StoreAddress = store["City"].AsString,
                        };

                        orderItemsList.Add(orderItem);
                    }
                }
            }
        }
    }

    return orderItemsList;
}

[HttpGet("getItems")]
public IActionResult GetItems()
{
    try
    {
        var items = StoryIteams.Find(new BsonDocument()).ToEnumerable();
        var jsonItems = items.Select(doc => new
        {
            Id = doc["_id"].AsObjectId.ToString(),
            Name = doc["Name"].AsString,
            Description = doc["Description"].AsString,
            Price = doc["Price"].AsInt32,
            Category = doc["Category"].AsString,
            DateAdded = doc["DateAdded"].AsString,
            Photos = doc["Photos"].AsString,
            BusinesId = doc["BusinesId"].AsString,
            BusinesName = doc["BusinesName"].AsString,
            Amount = doc["Amount"].AsInt32
        });

        return Ok(jsonItems);
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error fetching items: {ex.Message}");
        return Ok(new { Success = false, Message = "Error fetching items" });
    }
}


[HttpPost("submitOrder")]
public IActionResult SubmitOrder([FromBody] OrderModel orderModel)
{
    try
    {
        if (orderModel == null || orderModel.OrderItems == null || orderModel.OrderItems.Count == 0)
        {
            return BadRequest("Invalid order data");
        }

        Console.WriteLine("Received orderItems from client:");
        foreach (var orderItem in orderModel.OrderItems)
        {
            Console.WriteLine($"Item ID: {orderItem.ItemId}, Quantity: {orderItem.Quantity}");
        }

        var storyIteamsCollection = StoryIteams;

        foreach (var orderItem in orderModel.OrderItems)
        {
            var filterStoryIteams = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(orderItem.ItemId));
            var storyIteam = storyIteamsCollection.Find(filterStoryIteams).FirstOrDefault();

            if (storyIteam != null)
            {
                var initialAmount = storyIteam.GetValue("Amount", 0).AsInt32;
                Console.WriteLine($"Initial Amount in StoryIteams for Item ID {orderItem.ItemId}: {initialAmount}");
                var updateStoryIteams = Builders<BsonDocument>.Update.Inc("Amount", -orderItem.Quantity);
                storyIteamsCollection.UpdateOne(filterStoryIteams, updateStoryIteams);

                var finalAmount = storyIteamsCollection.Find(filterStoryIteams).FirstOrDefault()?.GetValue("Amount", 0).AsInt32;
                Console.WriteLine($"Final Amount in StoryIteams for Item ID {orderItem.ItemId}: {finalAmount}");
            }
            else
            {
                Console.WriteLine($"Item with ID {orderItem.ItemId} not found in StoryIteams");
            }
        }

        var ordersCollection = Orders;
        var orderItemsDocuments = orderModel.OrderItems.Select(orderItem => new BsonDocument
        {
            { "ItemId", orderItem.ItemId },
            { "Quantity", orderItem.Quantity },
        });

        string userId = orderModel.UserId;

        var orderDocument = new BsonDocument
        {
            { "idClient", userId }, 
            { "IsProcessing", false }, 
            { "location", orderModel.Location },  // Use the location from the orderModel
            { "Completed", false },
            { "IsActive", true },
            {"CourierId", "null"},
            { "OrderItems", new BsonArray(orderItemsDocuments) },
        };

        Console.WriteLine("Inserting into Orders");
        ordersCollection?.InsertOne(orderDocument);
        return Ok(new { Success = true, Message = "Order submitted successfully" });
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error submitting order: {ex.Message}");
        return Ok(new { Success = false, Message = "Error submitting order" });
    }
}



[HttpGet("getOrders")]
public IActionResult GetOrders()
{
    try
    {
        var ordersCursor = Orders.Find(new BsonDocument()).ToEnumerable();
        var jsonOrders = ordersCursor.Select(doc => new
        {
            _id = doc["_id"].ToString(),
             IsProcessing = doc["IsProcessing"].ToString(),
            Completed = doc["Completed"].ToString(),
            IsActive = doc["IsActive"].ToString(),
            Location = doc["location"].ToString(),
            CourierId = doc["CourierId"].ToString(),
            OrderItems = GetOrderItemsDetails(doc["OrderItems"]),
        }).ToList();

        return Ok(jsonOrders);
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error fetching orders: {ex.Message}");
        return Ok(new { Success = false, Message = "Error fetching orders" });
    }
}


   [Route("regcurer")]
        public IActionResult regcurer()
        {
            string iduser = HttpContext.Request.Form["iduser"];
            string initial = HttpContext.Request.Form["initial"];
            string email = HttpContext.Request.Form["email"];
            string phonenumber = HttpContext.Request.Form["phonenumber"];
            string password = HttpContext.Request.Form["password"];
            var document = new BsonDocument
            {
                { "iduser", iduser },
                { "initial", initial },
                { "email", email },
                { "phonenumber", phonenumber },
                { "password", password }
            };
            Curers.InsertOne(document);
            return Ok(true);
        }

private static List<CuryerAccept> CuryerAcceptList = new List<CuryerAccept>
{
    new CuryerAccept { ID = "1", Description = "Замовлення 1", Accept = false },
    new CuryerAccept { ID = "2", Description = "Замовлення 2", Accept = false },
};

[HttpGet("showAcceptOrders/{id}")]
public IActionResult ShowAcceptOrders(string id)
{
    Console.WriteLine(id);

    var curyerAccept = CuryerAcceptList.FirstOrDefault(z => z.ID == id);

    if (curyerAccept == null)
    {
        return NotFound();
    }

    switch (curyerAccept.Accept)
    {
        case false:
            curyerAccept.Accept = true;
            Console.WriteLine("Order Accepted");
            return Ok("Accept");
        case true:
            Console.WriteLine("Order Already Accepted");
            return Ok();
        default:
            return BadRequest("Invalid Accept value");
    }
}

[HttpPost("logincurer")]
public IActionResult LoginCourier([FromBody] JsonElement data)
{
    try
    {
        if (data.TryGetProperty("email", out var emailElement) && data.TryGetProperty("password", out var passwordElement))
        {
            string curerEmail = emailElement.GetString();
            string password = passwordElement.GetString();

            if (string.IsNullOrEmpty(curerEmail) || string.IsNullOrEmpty(password))
            {
                return BadRequest("Invalid email or password");
            }

            var filter = Builders<BsonDocument>.Filter.Eq("email", curerEmail) & Builders<BsonDocument>.Filter.Eq("password", password);
            var curer = Curers.Find(filter).FirstOrDefault();

            if (curer != null)
            {
                var response = new
                {
                    success = true,
                    curerId = curer["_id"].ToString(),
                    curerEmail = curer["email"].AsString,
                    curerName = curer["initial"].AsString,
                };

                return Ok(response);
            }
            else
            {
                var response = new
                {
                    success = false,
                    message = "Invalid email or password",
                };

                return Ok(response);
            }
        }
        else
        {
            return BadRequest("Invalid JSON format");
        }
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error during courier login: {ex.Message}");

        return Ok(new { success = false, message = "Error during courier login" });
    }
}

[HttpPost("courierRequestOrder")]
public IActionResult CourierRequestOrder([FromBody] JsonRequestData requestData)
{
    try
    {
        string orderId = requestData.OrderId;
        string courierId = requestData.CourierId;

        if (string.IsNullOrEmpty(orderId))
        {
            return BadRequest("Invalid order ID");
        }

        var orderFilter = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(orderId));
        var orderUpdate = Builders<BsonDocument>.Update
            .Set("IsProcessing", true)
            .Set("CourierId", courierId);

        var updateResult = Orders.UpdateOne(orderFilter, orderUpdate);

        if (updateResult.ModifiedCount == 0)
        {
            return NotFound("Order not found");
        }

        return Ok(new { Success = true, Message = "Order accepted successfully" });
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error accepting order: {ex.Message}");

        return Ok(new { Success = false, Message = "Error accepting order" });
    }
}

public class JsonRequestData
{
    public string OrderId { get; set; }
    public string CourierId { get; set; }
    public bool IsAccepted { get; set; }
}

public class ItemModel
{
    public string Name { get; set; }
    public string Description { get; set; }
    public int Price { get; set; }
    public string Category { get; set; }
    public DateTime DateAdded { get; set; }
    public List<string> Photos { get; set; }
    public int Amount { get; set; }
    public string BusinesId { get; set; }
    public string BusinesName { get; set; }
}

[HttpPost("grantAdminRights")]
public IActionResult GrantAdminRights([FromBody] dynamic data)
{
    try
    {
        string partnerId = data.partnerId;

        if (string.IsNullOrEmpty(partnerId))
        {
            return BadRequest("Invalid partner ID");
        }

        var filter = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(partnerId));
        var update = Builders<BsonDocument>.Update.Set("IsAdmin", true);
        PartnerCollection.UpdateOne(filter, update);

        return Ok(new { Success = true, Message = "Admin rights granted successfully" });
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error granting admin rights: {ex.Message}");
        return Ok(new { Success = false, Message = "Error granting admin rights" });
    }

    return Ok(new { success = true });
}

[HttpGet("checkAdmin")]
public IActionResult CheckAdmin()
{
    bool isAdmin = true;

    return Ok(new { isAdmin });
}

public class BusinessModel
{
    public string BusinessName { get; set; }
    public string City { get; set; }
    public string EstablishmentType { get; set; }
    public string PhoneNumber { get; set; }
}

public class UserModel
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}

public class CourierModel
{
    public string CourierName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}



[HttpPut("editItem/{itemId}")]
public IActionResult adminEditItem(string itemId, [FromBody] ItemModel updatedItemModel)
{
    try
    {
        Console.WriteLine($"Received request for item ID: {itemId}");

        if (string.IsNullOrEmpty(itemId))
        {
            return BadRequest("Invalid item ID");
        }

        Console.WriteLine($"Received updatedItemModel: {System.Text.Json.JsonSerializer.Serialize(updatedItemModel)}");

        var filter = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(itemId));
        var updateBuilder = Builders<BsonDocument>.Update;

        var updateDefinitions = new List<UpdateDefinition<BsonDocument>>();

        if (updatedItemModel.Name != null)
        {
            updateDefinitions.Add(updateBuilder.Set("Name", updatedItemModel.Name));
        }

        if (updatedItemModel.Description != null)
        {
            updateDefinitions.Add(updateBuilder.Set("Description", updatedItemModel.Description));
        }

        if (updatedItemModel.Price != null)
        {
            updateDefinitions.Add(updateBuilder.Set("Price", updatedItemModel.Price));
        }

        var combinedUpdate = updateBuilder.Combine(updateDefinitions);

        StoryIteams.UpdateOne(filter, combinedUpdate);

        return Ok(new { Success = true, Message = "Item updated successfully" });
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error updating item: {ex.Message}");
        return Ok(new { Success = false, Message = ex.Message });
    }
}


    [HttpPut("editBusiness/{businessId}")]
    public IActionResult EditBusiness(string businessId, [FromBody] BusinessModel updatedBusinessModel)
    {
        try
        {
            if (string.IsNullOrEmpty(businessId))
            {
                return BadRequest("Invalid business ID");
            }
            var filter = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(businessId));
            var update = Builders<BsonDocument>.Update
                .Set("BusinessName", updatedBusinessModel.BusinessName)
                .Set("City", updatedBusinessModel.City)
                .Set("EstablishmentType", updatedBusinessModel.EstablishmentType)
                .Set("PhoneNumber", updatedBusinessModel.PhoneNumber);
            PartnerCollection.UpdateOne(filter, update);
            return Ok(new { Success = true, Message = "Business updated successfully" });
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error updating business: {ex.Message}");
            return Ok(new { Success = false, Message = "Error updating business" });
        }
    }

    [HttpPut("editUser/{userId}")]
    public IActionResult EditUser(string userId, [FromBody] UserModel updatedUserModel)
    {
        try
        {
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("Invalid user ID");
            }
            var filter = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(userId));
            var update = Builders<BsonDocument>.Update
                .Set("UserName", updatedUserModel.UserName)
                .Set("Email", updatedUserModel.Email)
                .Set("PhoneNumber", updatedUserModel.PhoneNumber);

            return Ok(new { Success = true, Message = "User updated successfully" });
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error updating user: {ex.Message}");
            return Ok(new { Success = false, Message = "Error updating user" });
        }
    }

    [HttpPut("editCourier/{courierId}")]
    public IActionResult EditCourier(string courierId, [FromBody] CourierModel updatedCourierModel)
    {
        try
        {
            if (string.IsNullOrEmpty(courierId))
            {
                return BadRequest("Invalid courier ID");
            }
            var filter = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(courierId));
            var update = Builders<BsonDocument>.Update
                .Set("CourierName", updatedCourierModel.CourierName)
                .Set("Email", updatedCourierModel.Email)
                .Set("PhoneNumber", updatedCourierModel.PhoneNumber);

            return Ok(new { Success = true, Message = "Courier updated successfully" });
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error updating courier: {ex.Message}");
            return Ok(new { Success = false, Message = "Error updating courier" });
        }
    }





[HttpGet("getItemsForBusiness/{businessId}")]
public IActionResult GetItemsForBusiness(string businessId)
{
    try
    {
        if (string.IsNullOrEmpty(businessId))
        {
            return BadRequest("Invalid business ID");
        }
        var items = StoryIteams.Find(new BsonDocument { { "BusinesId", businessId } }).ToEnumerable();
        var jsonItems = items.Select(doc => new
        {
            Id = doc["_id"].AsObjectId.ToString(),
            Name = doc["Name"].AsString,
            Description = doc["Description"].AsString,
            Price = doc["Price"].AsInt32,
            Category = doc["Category"].AsString,
            DateAdded = doc["DateAdded"].AsString,
            Photos = doc["Photos"].AsString,
            BusinesId = doc["BusinesId"].AsString,
            BusinesName = doc["BusinesName"].AsString,
            Amount = doc["Amount"].AsInt32
        });

        return Ok(jsonItems);
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error fetching items for business: {ex.Message}");
        return Ok(new { Success = false, Message = "Error fetching items for business" });
    }
}

[HttpDelete("cancelOrder/{orderId}")]
public IActionResult CancelOrder(string orderId)
{
    try
    {
        if (string.IsNullOrEmpty(orderId))
        {
            return BadRequest("Invalid order ID");
        }

        var filter = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(orderId));
        var update = Builders<BsonDocument>.Update.Set("IsCancelled", true);
        Orders.UpdateOne(filter, update);

        return Ok(new { Success = true, Message = "Order cancelled successfully" });
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error cancelling order: {ex.Message}");
        return Ok(new { Success = false, Message = "Error cancelling order" });
    }
}

[HttpPost("courierCompleteOrder")]
public IActionResult CourierCompleteOrder([FromBody] JsonRequestData requestData)
{
    try
    {
        string orderId = requestData.OrderId;
        string courierId = requestData.CourierId;

        if (string.IsNullOrEmpty(orderId))
        {
            return BadRequest("Invalid order ID");
        }

        var acceptedOrderFilter = Builders<BsonDocument>.Filter.And(
            Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(orderId)),
            Builders<BsonDocument>.Filter.Eq("IsProcessing", true)
        );

        var acceptedOrder = Orders.Find(acceptedOrderFilter).FirstOrDefault();

        if (acceptedOrder == null)
        {
            return BadRequest("Order must be accepted before completion");
        }

        var orderFilter = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(orderId));
        var orderUpdate = Builders<BsonDocument>.Update
            .Set("Completed", true)
            .Set("IsProcessing", false);

        var updateResult = Orders.UpdateOne(orderFilter, orderUpdate);

        if (updateResult.ModifiedCount == 0)
        {
            return NotFound("Order not found");
        }

        return Ok(new { Success = true, Message = "Order completed successfully" });
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error completing order: {ex.Message}");

        return Ok(new { Success = false, Message = "Error completing order" });
    }
}


}