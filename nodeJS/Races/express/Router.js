const swaggerUi = require('swagger-ui-express');

const port = 3000;
const jwt = require('jsonwebtoken');
const Controller = require('./Controller') ;
const swaggerDoc = require('./api/swagger/swagger.json')

function router(app) {
    let controller = new Controller();
    let tokenArray = [];

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

    /*
* @oas [post] /api/login/{userId}
* description: "login user"
* parameters:
*   -  name: "userId"
*      in: path
*      description: "The user id"
*      type: "string"
*      default: "5da2353b83550b0f78bac228"
* responses:
    200:
      description: OK
      examples:
         application/json: {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkYTIzNTViODM1NTBiMGY3OGJhYzIyOSIsIm5hbWUiOiJFZ29yIiwic3VybmFtZSI6IkdvcmJpayIsInVzZXJuYW1lIjoiZS5nb3JiaWsiLCJfX3YiOjB9LCJpYXQiOjE1NzEwNDg4MDF9.rza0ZXy9I0ZGM5cEc4FKI-Z6CH5e6JkxPaF5pV5bzXw",
    "user": {
        "_id": "5da2355b83550b0f78bac229",
        "name": "Egor",
        "surname": "Gorbik",
        "username": "e.gorbik",
        "__v": 0
    }
}
    400:
      description: Bad request. User ID must be an string and bigger than 0.
    401:
      description: Authorization information is missing or invalid.
    404:
      description: A user with the specified ID was not found.
*/
    app.post('/api/login/:id', async (req, res) => {
        let user = await controller.getUserInfo(req, res);
        jwt.sign({user}, 'secretkey', (err, token) => {
            tokenArray.push(token)
            console.log(tokenArray)
            res.json({
                token,
                user
            })
        })
    })

    /*
* @oas [delete] /logout
* description: "login user"
* parameters:
*   -  name: "headers"
*      in: headers
*      description: "Headers for this request"
*      schema:
*        example:
*          {"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQ2FzdCB0byBPYmplY3RJZCBmYWlsZWQgZm9yIHZhbHVlIFwiNTNiODM1NTBiMGY3OGJhYzIyOFwiIGF0IHBhdGggXCJfaWRcIiBmb3IgbW9kZWwgXCJVc2VyXCIiLCJpYXQiOjE1NzEwNDgyOTZ9.HWh0Cp_81p2ldv_CuA-9XHmdUuTkJOtfoceB0sP2774"}
* responses:
   200:
     description: OK
   400:
     description: Bad request. User ID must be an string and bigger than 0.
   401:
     description: Authorization information is missing or invalid.
   404:
     description: A user with the specified ID was not found.
*/
    app.delete('/logout', (req, res) => {
        tokenArray = tokenArray.filter(token => token !== req.body.token);
        res.sendStatus(204)
    })

    function verifyToken(req, res, next) {
        const token = req.headers['authorization'];
        if(token === null) {
            return res.sendStatus(401)
        }
        jwt.verify(token, 'secretkey', (err, user) => {
            if(err) return res.sendStatus(403)
            req.user = user
            next()
        })

    }

    //additionally
    /*
* @oas [post] /registerUserToLeague
* description: "register user to league"
* parameters:
*   -  name: "headers"
*      in: headers
*      description: "Headers for this request"
*      schema:
*        example:
*          {"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQ2FzdCB0byBPYmplY3RJZCBmYWlsZWQgZm9yIHZhbHVlIFwiNTNiODM1NTBiMGY3OGJhYzIyOFwiIGF0IHBhdGggXCJfaWRcIiBmb3IgbW9kZWwgXCJVc2VyXCIiLCJpYXQiOjE1NzEwNDgyOTZ9.HWh0Cp_81p2ldv_CuA-9XHmdUuTkJOtfoceB0sP2774"}
*   -  name: "body"
*      in: body
*      description: "Body for this request"
*      schema:
*        example: {
	"leagueId": "5da2369683550b0f78bac22c"
}
* responses:
       200:
         description: OK
         examples:
            application/json: {
    "users_id": [
        "5da2353b83550b0f78bac228",
        "5da355aeafa06829f420b525",
        "5da25aee4fa2720ea834895e"
    ],
    "_id": "5da2369683550b0f78bac22c",
    "title": "Низшая лига",
    "description": "ни о чём",
    "season": "spring",
    "__v": 0
}
       400:
         description: Bad request. User ID must be an string and bigger than 0.
       401:
         description: Authorization information is missing or invalid.
       404:
         description: A user with the specified ID was not found.
*/
    app.post('/registerUserToLeague', verifyToken, controller.registerUserToLeague);

    /*
* @oas [get] /getUserRaces/
* description: "return user with his races"
* parameters:
 *   -  name: "headers"
 *      in: headers
 *      description: "The headers of request"
 *      schema:
 *        example:
 *          {"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQ2FzdCB0byBPYmplY3RJZCBmYWlsZWQgZm9yIHZhbHVlIFwiNTNiODM1NTBiMGY3OGJhYzIyOFwiIGF0IHBhdGggXCJfaWRcIiBmb3IgbW9kZWwgXCJVc2VyXCIiLCJpYXQiOjE1NzEwNDgyOTZ9.HWh0Cp_81p2ldv_CuA-9XHmdUuTkJOtfoceB0sP2774"}
 * responses:
       200:
         description: OK
         examples:
            application/json: {
        "_id": "5da2355b83550b0f78bac229",
        "name": "Egor",
        "surname": "Gorbik",
        "username": "e.gorbik",
        "racesForThisUser": [
            {
                "_id": "5da2380d83550b0f78bac230",
                "time": 15,
                "description": "Egor в июне",
                "title": "нечего сказать",
                "user_id": "5da2355b83550b0f78bac229",
                "stage_id": "5da2377483550b0f78bac22d",
                "__v": 0
            }
        ]
    }
       400:
         description: Bad request. User ID must be an string and bigger than 0.
       401:
         description: Authorization information is missing or invalid.
       404:
         description: A user with the specified ID was not found.
*/
    app.get('/getUserRaces', verifyToken, controller.getUserRaces)

    /*
* @oas [get] /getUserLeagues/{userId}
* description: "return user with his league"
* parameters:
*   - (path) userId=5da2353b83550b0f78bac228* {String} The user id
* responses:
       200:
         description: OK
         examples:
            application/json: {
        "_id": "5da2355b83550b0f78bac229",
        "name": "Egor",
        "surname": "Gorbik",
        "username": "e.gorbik",
        "leaguesForThisUser": [
            {
                "_id": "5da2362783550b0f78bac22b",
                "users_id": [
                    "5da2353b83550b0f78bac228",
                    "5da2355b83550b0f78bac229",
                    "5da2357d83550b0f78bac22a",
                    "5da2353b83550b0f78bac2",
                    "5da2353b83550b0f78bac2kdfjl",
                    "5da2353b83550b0f78bac2kddf",
                    "5da25aee4fa2720ea834895e"
                ],
                "title": "Высшая лига",
                "description": "самая лучшая",
                "season": "summer",
                "__v": 0
            }
        ]
    }
       400:
         description: Bad request. User ID must be an string and bigger than 0.
       401:
         description: Authorization information is missing or invalid.
       404:
         description: A user with the specified ID was not found.
*/
    app.get('/getUserLeagues/:id', controller.getUserLeagues)

    /*
* @oas [get] /getSeasonRaces/{season}
* description: "return all race and stage for this season"
* parameters:
*   - (path) season=summer* {String} Name of season
* responses:
       200:
         description: OK
         examples:
           application/json: {
    "_id": "5da2362783550b0f78bac22b",
    "stagesArr": {
      "_id": "5da2377483550b0f78bac22d",
      "title": "june",
      "description": "июнь",
      "location": "парк",
      "racesArray": [
        {
          "_id": "5da2380d83550b0f78bac230",
          "time": 15,
          "description": "Egor в июне",
          "title": "нечего сказать",
          "user_id": "5da2355b83550b0f78bac229",
          "stage_id": "5da2377483550b0f78bac22d",
          "__v": 0
        },
        {
          "_id": "5da238d383550b0f78bac231",
          "time": 15,
          "description": "Mike в июне",
          "title": "нечего сказать",
          "user_id": "5da2353b83550b0f78bac228",
          "stage_id": "5da2377483550b0f78bac22d",
          "__v": 0
        },
        {
          "_id": "5da238fe83550b0f78bac232",
          "time": 15,
          "description": "Artuom в июне",
          "title": "нечего сказать",
          "user_id": "5da2357d83550b0f78bac22a",
          "stage_id": "5da2377483550b0f78bac22d",
          "__v": 0
        }
      ]
    }
  }
       400:
         description: Bad request. Season must be an string and bigger than 0.
       401:
         description: Authorization information is missing or invalid.
       404:
         description: Races with this season was not found.
*/
    app.get('/getSeasonRaces/:season', controller.getSeasonRaces)


    //CRUD
    /*
 * @oas [get] /{table}/{tableId}
 * description: "Returns a specific table, that id matches the tableId"
 * parameters:
 *   -  name: "table"
 *      in: path
 *      description: "The table value"
 *      type: "string"
 *      default: "user"
 *   -  name: "tableId"
 *      in: path
 *      description: "The table id"
 *      type: "string"
 *      default: "5da2353b83550b0f78bac228"
 * responses:
        200:
          description: OK
          examples:
            application/json: {
    "_id": "5da2353b83550b0f78bac228",
    "name": "Egor",
    "surname": "Gorbik",
    "username": "e.gorbik",
    "__v": 0
}
        400:
          description: Bad request. User ID must be an string and bigger than 0.
        401:
          description: Authorization information is missing or invalid.
        404:
          description: A user with the specified ID was not found.
*/
    app.get('/:table/:id', controller.getInstance)

    /*
 * @oas [post] /{table}
 * description: "Create a new table instance"
 * parameters:
 *   -  name: "table"
 *      in: path
 *      description: "The table value"
 *      type: "string"
 *      default: "user"
 *   -  name: "body"
 *      in: body
 *      description: "The table value"
 *      schema:
 *        example:
 *          {"name": "Egor", "surname": "Gorbik", "username": "e.gorbik"}
 * responses:
        200:
          description: OK
          examples:
            application/json: {
    "_id": "5da2353b83550b0f78bac228",
    "name": "Egor",
    "surname": "Gorbik",
    "username": "e.gorbik",
    "__v": 0
}
        400:
          description: Bad request. User ID must be an string and bigger than 0.
        401:
          description: Authorization information is missing or invalid.
        404:
          description: Instance by given name was not found.
*/
    app.post('/:table', controller.createInstance);



    /*
* @oas [put] /{table}/{tableId}
* description: "Update a specific table, that id matches the tableId, and return it"
 * parameters:
 *   -  name: "table"
 *      in: path
 *      description: "The table value"
 *      type: "string"
 *      default: "user"
 *   -  name: "tableId"
 *      in: path
 *      description: "The table id"
 *      type: "string"
 *      default: "5da2353b83550b0f78bac228"
 *   -  name: "body"
 *      in: body
 *      description: "Body of request"
 *      schema:
 *        example:
 *          {"_id": "5da2353b83550b0f78bac228", "name": "Egor", "surname": "Gorbik", "username": "e.gorbik"}
 * responses:
       200:
          description: OK
          examples:
            application/json: {
    "_id": "5da2353b83550b0f78bac228",
    "name": "Egor",
    "surname": "Gorbik",
    "username": "e.gorbik",
    "__v": 0
}
       400:
         description: Bad request. User ID must be an string and bigger than 0.
       401:
         description: Authorization information is missing or invalid.
       404:
         description: Instance by given name or id was not found.
*/
    app.put('/:table/:id', controller.updateInstance)

    /*
 * @oas [delete] /{table}/{tableId}
 * description: "Delete a specific table, that id matches the tableId"
 * parameters:
 *   -  name: "table"
 *      in: path
 *      description: "The table value"
 *      type: "string"
 *      default: "user"
 *   -  name: "tableId"
 *      in: path
 *      description: "The table id"
 *      type: "string"
 *      default: "5da2353b83550b0f78bac228"
 * responses:
        200:
          description: OK
        400:
          description: Bad request. User ID must be an string and bigger than 0.
        401:
          description: Authorization information is missing or invalid.
        404:
          description: A user with the specified ID was not found.
*/
    app.delete('/:table/:id', controller.deleteInstance)

    app.listen(port, (err) => {
        if (err) {
            return console.log('something bad happened', err)
        }
        console.log(`server is listening on ${port}`)
    })
}


module.exports = router;
