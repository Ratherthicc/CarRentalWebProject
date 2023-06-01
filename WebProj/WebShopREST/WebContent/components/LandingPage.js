Vue.component("landingpage", {
	data: function () {
		    return {
				RentalAgencies: []
		    }
	},
	template: ` 
    <div class="landingPage">
        <header>
            <label class="header">Rent a car</label>
            <nav>
                <ul class="nav_links">
                    <li class="nav_li"><a class="nav_a" v-on:click="SignInButton">Sign in</a></li>
                </ul>
            </nav>
            <a class="nav_a" v-on:click="logInButton"><button class="nav_button">Log in</button></a>
        </header>
        <table>
            <tr class="tableHeader">
                <th>Logo</th>
                <th>Name</th>
                <th>Location</th>
                <th>Rating</th>
            </tr>
            <tr v-for="r in RentalAgencies" class="dataRow">
                <td>
                	<div class="imageContainer">
            			<img v-bind:src="r.logoURI" class="rowDataImage"/>
       				</div>
                </td>
                <td>{{r.name}}</td>
                <td>{{r.location.street + ', ' + r.location.streetNumber + ', ' + r.location.city}}</td>
                <td>{{r.rating}}</td>
            </tr>
        </table>
    </div>
	`
	, 
	methods : {
		logInButton: function (){
			router.push(`/login`);
		},
		SignInButton: function (){
			router.push(`/register`);
		}
	},
	mounted () {
		axios.get(`rest/rentalAgency/getAll`).then((response) => {this.RentalAgencies = response.data;
																  this.RentalAgencies.sort((a, b) => b.state.localeCompare(a.state));})
    }
});