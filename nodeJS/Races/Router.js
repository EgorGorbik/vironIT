const port = 3000;
const jwt = require('jsonwebtoken');
const Controller = require('./Controller') ;

function router(app) {
    let controller = new Controller();
    let tokenArray = [];

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
* @oas [get] /getUserRaces/{userId}
* description: "return user with his races"
* parameters:
*   - (path) userId=hi* {String} The user id
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
    app.get('/getUserRaces', verifyToken, controller.getUserRaces)

    /*
* @oas [get] /getUserLeagues/{userId}
* description: "return user with his league"
* parameters:
*   - (path) userId=hi* {String} The user id
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
    app.get('/getUserLeagues/:id', controller.getUserLeagues)

    /*
* @oas [get] /getSeasonRaces/{season}
* description: "return user with his league"
* parameters:
*   - (path) season=hi* {String} Name of season
* responses:
       200:
         description: OK
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
 *   - (path) tableId=hi* {String} The table id
 *   - (path) table=hi* {String} The table value
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
    app.get('/:table/:id', controller.getInstance)

    /*
 * @oas [post] /{table}
 * description: "Create a new table instance"
 * parameters:
 *   - (path) table=hi* {String} The table value
 * responses:
        200:
          description: OK
        400:
          description: Bad request. User ID must be an string and bigger than 0.
        401:
          description: Authorization information is missing or invalid.
        404:
          description: Instance by given name was not found.
*/
    app.post('/registerUserToLeague', verifyToken, controller.registerUserToLeague);
    app.post('/:table', controller.createInstance);


    /*
* @oas [put] /{table}/{tableId}
* description: "Update a specific table, that id matches the tableId, and return it"
* parameters:
*   - (path) tableId=hi* {String} The table id
*   - (path) table=hi* {String} The table value
* responses:
       200:
         description: OK
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
 *   - (path) tableId=hi* {String} The table id
 *   - (path) table=hi* {String} The table value
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
