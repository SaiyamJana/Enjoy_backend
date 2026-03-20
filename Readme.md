# backend for Enjoy website

used express.js , mongoose , dotenv 
used mongodb database

database connection done using function from /db/index.js , db connection in /src/index.js

cors and cookie-parser

added ApiError , ApiResponse classes in utils 
added asyncHandler function in utils for direct usage of async functions which will be used in express.js

models design
user , video done

mongodb query use --> npm i mongoose-aggregate-paginate-v2

installing bcrypt and JWT(JSON webtoken)