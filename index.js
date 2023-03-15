const Hapi = require('hapi');
const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

//POST path /contacts (response code 201)
let contacts = [];
server.route({
    method: 'POST',
    path: '/contacts',
    handler: (request, h) => {
        const { id, name, email, phone } = request.payload;
        const contact = { id, name, email, phone };
        contacts.push(contact);
        return h.response(contact).code(201);
    }
});


//GET path /contacts (response code 200)
server.route({
    method: 'GET',
    path: '/contacts',
    handler: (request, h) => {
        return h.response(contacts).code(200);
    }
})

//DELETE path /contacts/:id (response code 200)
server.route({
    method: 'DELETE',
    path: '/contacts/{id}',
    handler: (request, h) => {
        const { id } = request.params;
        const index = contacts.findIndex(contact => contact.id === id);
        if (index !== -1) {
            const contact = contacts[index];
            contacts.splice(index, 1);
            return h.response(contact).code(200);
        } else {
            return h.response().code(404);
        }
    }
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};
init();
