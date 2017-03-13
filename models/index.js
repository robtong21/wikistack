var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

let Page = db.define('page', {

     title: {
          type: Sequelize.STRING,
          allowNull: false
     },
     urlTitle: {
          type: Sequelize.STRING,
          allowNull: false
     },
     content: {
         type: Sequelize.TEXT,
         allowNull: false
     },
     status: {
            type: Sequelize.ENUM('open', 'closed')
     },
     date: {
         type: Sequelize.DATE,
         defaultValue: Sequelize.NOW
     }
}, {
    getterMethods: {
        route: function () {return "/wiki/" + this.urlTitle}
    },
    hooks: {
        beforeValidate: function(pageinstance){
            pageinstance.urlTitle = generateUrlTitle(pageinstance.title);
        }
    }
})

let User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})


Page.belongsTo(User, { as: 'author' });


function generateUrlTitle(title){
    if(title) return title.replace(/\s+/g, '_').replace(/\W/g, '');
    else {
        return Math.random().toString(36).substring(2,7);
    }
}

module.exports = {
    Page: Page,
    User: User
};
