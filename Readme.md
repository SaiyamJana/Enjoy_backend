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
bcrypt and jwt methods in user model

file uploading  --> using cloudinary service(npm i cloudinary)
file uploading handling in express needs multer(npm i multer)

two steps (using multer , files are kept in server followed by uploading in cloudinary)
one step (using multer , upload the files in cloudinary)

upload on my device disk (a function written in middleware in multer)





#difficulties :
async and await during password hashing(bcrypt) in use.models.js

//register , login , logout in usercontroller
//for getting information about current user , developing a middleware 