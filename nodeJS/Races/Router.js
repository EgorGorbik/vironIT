const port = 3000;
const bodyParser = require('body-parser');
const Controller = require('./Controller') ;

function router(app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    let controller = new Controller();


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
    app.get('/getUserRaces/:id', (req, res) => {controller.getUserRaces(req, res)})

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
    app.get('/getUserLeagues/:id', (req, res) => {controller.getUserLeagues(req, res)})

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
    app.get('/getSeasonRaces/:season', (req, res) => {controller.getSeasonRaces(req, res)})

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
    app.get('/:table/:id', (req, res) => {controller.getInstance(req, res)})

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
    app.post('/:table', function (req, res) {controller.createInstance(req, res)});

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
    app.put('/:table/:id', function (req, res) {controller.updateInstance(req, res)})

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
    app.delete('/:table/:id', function (req, res) {controller.deleteInstance(req, res)})

    app.listen(port, (err) => {
        if (err) {
            return console.log('something bad happened', err)
        }
        console.log(`server is listening on ${port}`)
    })
}


module.exports = router;
