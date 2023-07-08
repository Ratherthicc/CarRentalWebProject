Vue.component("mainview", {
	data: function () {
		    return {
		      	username:null,
		      	user:{},
		      	textbox:"",
				SearchedAgencies: [],
				sortNameFlag: false,
				sortLocationFlag: false,
				sortRatingFlag: false,
				vehicle_type:"",
				vehicle_fuel:"",
				min_rating:0,
				map:null,
				
				selected_rental_id: null,
				commentFormFlag: false,
				comment: {
			    	"buyer": {
				      "username": "",
				      "password": null,
				      "first_name": null,
				      "last_name": null,
				      "gender": null,
				      "birth_date": null,
				      "type": null,
				      "points": 0.0,
				      "rank": null,
				      "blocked": 0,
				      "agencyId": 0
			    	},
			        "agency": {
			            "id": null,
			            "name": null,
			            "openingTime": null,
			            "closingTime": null,
			            "state": null,
			            "logoURI": null,
			            "rating": 0,
			            "location": null,
			            "vehicles": null
			        },
			        "text": "",
			        "rating": null,
			        "is_rated": "ON_HOLD"
			  	}
		    }
	},
	template: ` 
	<div style="overflow: auto;height: 100vh;">
		<div>
	        <input type="button" value="Make orders"  @click="findVehicles(username)">
	        <input type="button" value="View orders" @click="viewOrders" >
	        
	   </div>
	   
	   
	   
	   <header>
            <label class="header">Rent a car</label>
            <nav>
                <ul class="nav_links">
                    <li class="nav_li"><a class="nav_a" v-on:click="EditUser">Edit</a></li>
                </ul>
            </nav>
            <a class="nav_a"><button class="nav_button">{{this.user.first_name}}</button></a>
        </header>
        
	  <label class="my-profile-label">Personal information:</label>
	  <div class="separator-line"></div>
	
	  <div class="personal-info-div">
	    <label style="margin-bottom: 8px; color: orange; font-weight: 800; font-size: 24px; display: inline-block; text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);">Buyer</label>
	
	    <button v-on:click="EditUser" class="nav_button" style="margin-left: 210px; width: 100px; margin-right: 0px; height: 40px;">Edit</button><br>
	
	    <label>Username:</label>
	    <label class="add-info-values">{{this.user.username}}</label><br>
	
	    <label>Name & surname:</label>
	    <label class="add-info-values">{{this.user.first_name + ' ' + this.user.last_name}}</label><br>
	
	    <label>Birthdate:</label>
	    <label class="add-info-values">{{this.user.birth_date}}</label><br>
	
	    <label>Gender:</label>
	    <label class="add-info-values">{{this.user.gender}}</label><br>
	  </div>
	  
	  <label class="my-profile-label">Check out our agencies:</label>
	  <div class="separator-line"></div>
	  	  
	  <div style="padding: 32px; display:flex;gap: 18px;width:100%;">
	  
	  <table id="myTable" style="z-index: 2;position: relative; margin-top: 12px;left: 0%; width: 65%;">
            <tr class="tableHeader">
                <th>Logo</th>
                <th >Name</th>
                <th >Location</th>
                <th >Rating</th>
                <th>Discuss</th>
            </tr>
            <tr v-for="r in SearchedAgencies" class="dataRow">
                <td>
                	<div class="imageContainer">
            			<img v-bind:src="r.logoURI" class="rowDataImage"/>
       				</div>
                </td>
                <td>{{r.name}}</td>
                <td>{{r.location.street + ', ' + r.location.streetNumber + ', ' + r.location.city}}</td>
                <td>{{r.rating}}</td>
                <td>
                	<input type="button" style="cursor:pointer;background-color: #F86F15;height: 55%; width: 65%;" value="Comment" @click="showCommentWindow(r)" class="table-button">
                </td>
            </tr>
        </table>
        
        <div v-if="commentFormFlag" class="comment-form">
      <label class="comment-form-label">Rate Agency:</label><br>
      <div class="comment-form-inputs">
        <label>Your comment:</label><br>
        <textarea type="text" placeholder="Type text here..." v-model="comment.text" class="comment-input"></textarea><br>
        <label>Your rating:</label>
        <div id="ratingDiv" class="rating-div">
          <label>1</label>
          <label>2</label>
          <label>3</label>
          <label>4</label>
          <label>5</label>
        </div>
        <div id="ratingDiv" class="rating-div">
          <input type="radio" name="mark" value="1">
          <input type="radio" name="mark" value="2">
          <input type="radio" name="mark" value="3">
          <input type="radio" name="mark" value="4">
          <input type="radio" name="mark" value="5">
        </div>
      </div>
      <input class="nav_button" type="submit" value="Post comment" @click="makeComment">
    </div>

	 </div>
    </div>
    
    `
	, 
	methods : {
		EditUser:function(username){
			router.push(`/edit/${username}`);
		},
		findVehicles:function(username){
			router.push(`/searchVehicles/${username}`);
		},
		viewOrders:function(){
			router.push(`/viewOrders/${this.username}`);
		},
		showCommentWindow: function(r){
			if(this.commentFormFlag){
				this.selected_rental_id = null;
				this.commentFormFlag = false;
			}
			else{
				this.selected_rental_id = r.id;
				this.commentFormFlag = true;
			}			
		},
		makeComment: function(){
			this.comment.buyer.username = this.username;
			this.comment.agency.id = this.selected_rental_id;
			
			let radioBtns = document.querySelectorAll("input[name='mark']");
			
			let findSelected = () => {
				try{
					let selected = document.querySelector("input[name='mark']:checked").value;
					this.comment.rating = selected;
				}
				catch(e){
					this.comment.rating = -1;
				}
			}
			
			radioBtns.forEach(radioBtn => radioBtn.addEventListener("change", findSelected));
			
			findSelected();
			
			if(this.comment.text === "" 
			   || (this.comment.rating !== "1"
			   && this.comment.rating !== "2"
			   && this.comment.rating !== "3"
			   && this.comment.rating !== "4"
			   && this.comment.rating !== "5")){
				alert("Fill each field to post comment!");
			}
			else{
				axios.post(`rest/comments/addComment`, this.comment);
				alert("Successfully posted a comment!");
				this.selected_rental_id = null;
				this.commentFormFlag = false;
			}
		}
		
	},
	mounted () {
		this.username=this.$route.params.username;
		axios.get('rest/users/'+this.username)
			.then(response => {
				this.user=response.data;
				return axios.get(`rest/rentalAgency/getRateableAgencies/` + this.username);
				})
		.then((response) => {let RentalAgencies = response.data;
				             RentalAgencies.sort((a, b) => b.state.localeCompare(a.state));
					         this.SearchedAgencies= RentalAgencies.slice();});
			
    }
});