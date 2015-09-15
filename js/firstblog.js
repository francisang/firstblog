
$(function() {
 
    Parse.$ = jQuery;
    
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("LRB0TFbldHdLDsjKDfbSnq0P3WPixOscH0HwkfYr", "UPY2YmALYYauklpjB5R3BOFRUBUEEmEXE8XphnUa");
    
    /* $('.form-signin').on('submit', function(e) {
 
        // Prevent Default Submit Event
        e.preventDefault();
     
        // Get data from the form and put them into variables
        var data = $(this).serializeArray(),
            username = data[0].value,
            password = data[1].value;
     
        // Call Parse Login function with those variables
        Parse.User.logIn(username, password, {
            // If the username and password matches
            success: function(user) {
                alert('Welcome!');
            },
            // If there is an error
            error: function(user, error) {
                console.log(error);
            }
        });
 
    }); */
    
    var LoginView = Parse.View.extend({
        template: Handlebars.compile($('#login-tpl').html()),
        events: {
            'submit .form-signin': 'login',
            'submit .form-register': 'register'
        },
        login: function(e) {
     
            // Prevent Default Submit Event
            e.preventDefault();
     
            // Get data from the form and put them into variables
            var data = $(e.target).serializeArray(),
                username = data[0].value,
                password = data[1].value;
     
            // Call Parse Login function with those variables
            Parse.User.logIn(username, password, {
                // If the username and password matches
                success: function(user) {
                    var welcomeView = new WelcomeView({ model: user });
                    welcomeView.render();
                    $('.main-container').html(welcomeView.el);
                },
                // If there is an error
                error: function(user, error) {
                    console.log(error);
                }
            });
        },
        register: function() {
            var addUserView = new AddUserView();
            addUserView.render();
            $('.main-container').html(addUserView.el);
            
        },
        render: function(){
            this.$el.html(this.template());
        }
    }),
    WelcomeView = Parse.View.extend({
        template: Handlebars.compile($('#welcome-tpl').html()),
        render: function(){
            var attributes = this.model.toJSON();
            this.$el.html(this.template(attributes));
        }
    });
    
    var loginView = new LoginView();
    loginView.render();
    $('.main-container').html(loginView.el);
    
    var AddUserView = Parse.View.extend({
        template: Handlebars.compile($('#newuser-tpl').html()),
            
        render: function(){
            this.$el.html(this.template());
        }
    });
    
    var User = Parse.Object.extend('User', {
        create: function(name, username, email, photo, gender, address, password) {
            this.set({
                'name': name,
                'username': username,
                'email': email,
                'photo': photo,
                'gender': gender,
                'address': address,
                'password': password
            }).save(null, {
                success: function(user) {
                    alert('You added a new user: ' + blog.get('name'));
                },
                error: function(user, error) {
                    console.log(user);
                    console.log(error);
                }
            });
        }
    });
     
});
