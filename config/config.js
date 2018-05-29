const config = {
    status : {
        new : 1,
        confirm : 2,
        shipping : 3,
        done : 4
    },
    email : {
        username : 'xxdangminhtruongxx@gmail.com',
        pass : '01292007776t'
    },
    domain : "http://localhost:3000",
    userStatus : {
        isAdmin : 1,
        isStaff : 2,
        unConfirm : 3,
        isCustomer : 4,
        online : 5,
        superAdmin : 6
    },
    activity : {
        online : 1,
        offline : 0
    },
    reportPath : 'public/report'
}


module.exports = config;
