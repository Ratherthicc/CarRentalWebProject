Vue.component("agencyview", {
	data: function () {
		    return {
		      	RentalAgency: {
					id: null,
					name: "",
					openingTime: null,
					closingTime: null,
					state: null,
					logoURI: null,
					rating: null,
					location: null,
					vehicles: [],
				  },
				  comments: []
		    }
	},
	template: ` 
	<div style="overflow:auto; height: 100vh;padding-bottom:32px;">
    <header>
        <label class="header">Rent a car</label>
        <nav>
            <ul class="nav_links">
                <li class="nav_li"><a class="nav_a" v-on:click="SignInButton">Sign in</a></li>
            </ul>
        </nav>
        <a class="nav_a" v-on:click="logInButton"><button class="nav_button">Log in</button></a>
    </header>

    <div class="agency-preview">
        <div class="agency-info-div">
            <img v-bind:src="RentalAgency.logoURI" class="logo-image">
            <div class="agency-name">
                <label>{{RentalAgency.name}}</label>
                <span>
                    <label class="working-state-label">Currently:</label>
                    <label v-bind:class="{
                        'working-state': RentalAgency.state === 'WORKING',
                        'red-color': RentalAgency.state === 'NOT_WORKING',
                    }">{{RentalAgency.state}}</label>
                </span>
            </div>
        </div>

        <label>Additional info:</label>
        <div class="separator-line"></div>
        <div class="agency-additional-info">
            <span><label>Rating:</label><label class="add-info-values">{{RentalAgency.rating}}</label><label>/5</label></span>
            <span><label>Working hours:</label><label class="add-info-values">{{RentalAgency.openingTime?.hour + 'h - ' + RentalAgency.closingTime?.hour + 'h'}}</label></span>
            <span><label>Location:</label><label class="add-info-values">{{RentalAgency.location?.street + ', ' + RentalAgency.location?.streetNumber + ', ' + RentalAgency.location?.city}}</label></span>
        </div>

        <label>Available Vehicles:</label>
        <div class="separator-line"></div>

        <h1 style="margin-left: 25px;margin-top:32px;" v-if="RentalAgency.vehicles.length === 0">There are currently no vehicles in this agency</h1>

        <div class="vehicles">
            <div v-for="v in RentalAgency.vehicles" class="vehicle-card">
                <label class="mark">{{v.model + ' ' + v.brand}}</label>
                <label class="price">{{'Price: $' + v.price}}<label>/day</label></label>
                <img v-bind:src="v.picture">
                <div>
                    <span>
                        <label class="type">{{'Type: ' + v.transmission_type}}</label><br>
                        <label class="fuel-type">{{'Fuel Type: ' + v.fuel_type}}</label><br>
                        <label class="seats">{{'Number of Seats: ' +  v.people}}</label><br>
                        <label class="doors">{{'Number of Doors: ' + v.doors}}</label><br>
                        <label class="status">{{ 'Status: ' + (v.available ? 'Free' : 'Taken') }}</label>
                    </span>
                </div>
            </div>
        </div>

        <label style="margin-top:0px;" class="my-profile-label">Comments:</label>
        <div class="separator-line"></div>

		<h1 style="margin-left: 25px;margin-top:32px;" v-if="comments.length === 0">There are currently no approved comments for this agency</h1>

        <div v-for="c in comments" class="comments">
            <div class="comment">
                <div class="username-bubble">
                    <label>{{c?.buyer?.username + ':'}}</label>
                </div>
                <div class="comment-source">
                    <p>
                        {{c?.text}}
                    </p>
                </div>

                <div>
                    <div class="stars">
                        <p>User's rating:</p>
                        <label v-if="c?.rating >= 1">&#11088</label>
                        <label v-if="c?.rating >= 2">&#11088</label>
                        <label v-if="c?.rating >= 3">&#11088</label>
                        <label v-if="c?.rating >= 4">&#11088</label>
                        <label v-if="c?.rating >= 5">&#11088</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `
	,
	methods : {
		logInButton: function (){
			router.push(`/login`);
		},
		SignInButton: function (){
			router.push(`/register`);
		}},
	mounted () {
		var id = this.$route.params.id;
		axios
			.get(`rest/rentalAgency/getById/` + id).then(response => {
				this.RentalAgency = response.data;
				return axios.get('rest/comments/getByAgencyId/' + this.RentalAgency.id);
				})
			.then(response => {
				this.comments = response.data;
				this.comments = this.comments.filter(comment => comment.is_rated === "APPROVED");
				});
    }
});