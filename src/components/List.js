import React from 'react'

//importing needed components from react-bootstrap.................................
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class List extends React.Component{
    

    constructor(props) {
        super(props);
        //setting the state object of the app, it has nine keys as follow:..
        // (clear) for the button clear which is set by default to false, and when it's set to true, all recipes are deleted
        // (show) for the modal, to controll the pop up form, setted to false by default
        // (name) for the name of the recipe, each recipe has name based on the first input from user, which get updated on every submit action
        // (ingredients) same as name, but for the ingredients of the recipe
        // (eventKey) there is an event key value for each accordion.toggle and collaps, this value gets higher by one each time a new recipe is added
        // (array) this array conains the elements to be renderd representing the recipes added by the user, this array gets updated on each new addition
        // (id) a unique id for each new added recipe
        // (reset) to controll the rendered UI and resets the original structure of the app
        // (disable) controlls when the clear butto to be disabled
        this.state = {
            clear: false,
            show:false,
            name: "",
            ingredients: "",
            eventKey:3,
            array:[],
            id:"",
            reset:true,
            disable:true
        };

        this.handleDeleteAll = this.handleDeleteAll.bind(this);
        this.handleReset = this.handleReset.bind(this);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.afterSubmit = this.afterSubmit.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);

  
      }      
      
        // the method that is added onclick to the clear button to delete all the recipe
        handleDeleteAll(){
            this.setState({clear:true,
                            array:[],
                            disable:true,
                            id:""
                            });
        }
        // A method that takes a parameter that represents the id of the recipe, track that element and remove it from DOM
        deleteRecipe(i){
            let recipe = document.getElementById(i)
            recipe.remove()
        }
        // A method that resets the state object to the initial state
        handleReset(){
            this.setState(
                {reset:true,
                clear:false,
                array:[],
                disable:true,
                name: "",
                ingredients: "",  
                id:"", 
                }
                )
        }
        // A method which changes the show attr for the modal to true, so the pop up form pops up
        handleShow(){
            this.setState({show:true})
        }
        // A method which changes the show attr for the modal to false, so the pop up form disapear
        handleClose(){
            this.setState({show:false})
        }
        // A method that track the value of the user input for name of the recipe, and sets the name key of the state object to that value
        handleNameChange(event) {
            let name = event.target.value
            this.setState({
            name: name,
            });
        }
        // Same as handleNameChange but for the ingredients
        handleIngredientsChange(event) {
            let ingredients = event.target.value
            this.setState({
            ingredients:ingredients
            });
        }
        // This method get invoked on submit of the form, it gets the currunt value of the name and ingredients inputs..
        //  and passes them to the afterSubmit method as parameters, then invokes the afterSubmit method..
        // it also sets show to false, and sets an event-key for the new recipe of the previous one plus one
        // returns the name and ingredients values to empty strings once again
        handleSubmit(event) {
            let key=this.state.eventKey+1
            let name=this.state.name
            // converting the user provided string into an array before passing it to this.afterSubmit
            let ingredients = this.state.ingredients.split(',')
            this.setState({
            show:false,
            eventKey:key,
            disable:false,
            name: "",
            ingredients: "",   
            })
            this.afterSubmit(name, ingredients);
            event.preventDefault();
        }

        // This method takes the value of ingredients and name from the handleSubmit method as two parameters..
        // then pushes elements to the array of the state based on these values
        afterSubmit(name,ingredients){
            //mapping over the ingredients array and returning a li tag for each ingredient
            let ingredientsList = ingredients.map(x=><li>{x}</li>)
            // creating a new id for the new recipe
            let newId = this.state.id + "a"
            //updating the id in the state object
            this.setState({id:newId})
            this.state.array.push(
                //this division is to prevent the recatDom exception error
                <div>
                    <div id={newId}>  
                        <Card bg="secondary">
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={`${this.state.eventKey}`} size="lg" style={{color:"white",fontSize:"2.2vw"}}>
                                    {name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={`${this.state.eventKey}`}>
                                <Card.Body style={{color:"black",background:"#f5f5f5",fontSize:"1.5vw",textAlign:"left"}}>
                                    <ul>{ingredientsList}</ul>
                                    <Button variant="danger" size="sm" onClick={()=>this.deleteRecipe(newId)}>Delete</Button>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </div>
                </div>
            );
            }
        // This method mappes over the array which is passed as parameter represents the array of of the state object and returns each element
        addRecipe(array){
            return array.map((Recipe)=>Recipe)
        }     
       
    render(){
        
        if(this.state.clear==false && this.state.reset==true) {
        return(
        <div style={{width:"60vw"}} className="d-flex flex-column justify-content-center">
            <Accordion>
                <div>
                    <Card bg="secondary" id="firstRecipe">
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" size="lg" style={{color:"white",fontSize:"2.2vw"}}>
                                Basic Vanilla Cake
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body style={{color:"black",background:"#f5f5f5",fontSize:"1.5vw",textAlign:"left"}}>
                                <ul>
                                    <li>2 sticks unsalted butter, at room temperature, plus more for the pans</li>
                                    <li>3 cups all-purpose flour, plus more for the pans</li>
                                    <li>1 tablespoon baking powder</li>
                                    <li>1/2 teaspoon salt</li>
                                    <li>1 1/4 cups sugar</li>
                                    <li>4 large eggs, at room temperature</li>
                                    <li>1 tablespoon vanilla extract</li>
                                    <li>1 1/4 cups whole milk (or 3/4 cup heavy cream mixed with 1/2 cup water)</li>
                                </ul>
                                <Button variant="danger" size="sm" onClick={()=>this.deleteRecipe("firstRecipe")}>Delete</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </div>
                <div>
                    <Card bg="secondary" id="secRecipe">
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1" size="lg" style={{color:"white",fontSize:"2.2vw"}}>
                                Pizza Dough
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body style={{color:"black",background:"#f5f5f5",fontSize:"1.5vw",textAlign:"left"}}>
                                <ul>
                                    <li>1 1/2 cups (355 ml) warm water (105°F-115°F)</li>
                                    <li>1 package (2 1/4 teaspoons) active dry yeast</li>
                                    <li>3 3/4 cups (490 g) bread flour</li>
                                    <li>2 tablespoons extra virgin olive oil (omit if cooking pizza in a wood-fired pizza oven)</li>
                                    <li>2 teaspoons salt</li>
                                    <li>1 teaspoon sugar</li>
                                </ul>    
                                <Button variant="danger" size="sm" onClick={()=>this.deleteRecipe("secRecipe")}>Delete</Button>                
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </div>
                <div>
                    <Card bg="secondary" id="thirdRecipe">
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="2" size="lg" style={{color:"white",fontSize:"2.2vw"}}>
                                Basic pasta recipe               
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body style={{color:"black",background:"#f5f5f5",fontSize:"1.5vw",textAlign:"left"}}>
                                <ul>
                                    <li>1 egg, beaten</li>
                                    <li>½ teaspoon salt</li>
                                    <li>1 cup all-purpose flour</li>
                                    <li>2 tablespoons water</li>
                                </ul>
                                <Button variant="danger" size="sm" onClick={()=>this.deleteRecipe("thirdRecipe")}>Delete</Button>                    
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </div>
                {/*this is how the user added recipes are rendered, by passing the array to the addRecipe method */}
                {
                    this.addRecipe(this.state.array)
                }
            </Accordion>
            <div style={{marginTop:"1vw"}} className="d-flex flex-row justify-content-around">
                <Button variant="danger" size="lg" onClick={this.handleDeleteAll} >Clear</Button>
                <Button variant="light" size="lg" onClick={this.handleReset}>Reset</Button>  
                <Button variant="primary" size="lg" onClick={this.handleShow}>
                    Add 
                </Button>
            </div>

            <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new Recipe</Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleSubmit}>
                    <Modal.Body className="d-flex flex-column justify-content-center">
                        <label>Recipe name</label>
                        <input value={this.state.name} onChange={this.handleNameChange} placeholder="Enter a name for the Recipe"></input>
                        <label>Ingerdients</label>
                        <textarea value={this.state.ingredients} onChange={this.handleIngredientsChange} placeholder="separate ingredients with comma!"></textarea>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
        )
      }else{
          return(
            <div style={{width:"60vw"}} className="d-flex flex-column justify-content-center">
                <Accordion>
                    <div>
                        {this.addRecipe(this.state.array)}
                    </div>
                </Accordion>
                <div style={{marginTop:"1vw"}} className="d-flex flex-row justify-content-around">    
                    <Button variant="danger" size="lg" onClick={this.handleDeleteAll} disabled={this.state.disable}>Clear</Button>
                    <Button variant="light" size="lg" onClick={this.handleReset} >Reset</Button>  
                    <Button variant="primary" size="lg" onClick={this.handleShow} >Add</Button>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new Recipe</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSubmit}>
                        <Modal.Body className="d-flex flex-column justify-content-center">
                            <label>Recipe name</label>
                            <input value={this.state.name} onChange={this.handleNameChange} placeholder="Enter a name for the Recipe"></input>
                            <label>Ingerdients</label>
                            <textarea value={this.state.ingredients} onChange={this.handleIngredientsChange} placeholder="separate ingredients with comma!"></textarea>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Add
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
          )
      }
    }
}
        


export default List
