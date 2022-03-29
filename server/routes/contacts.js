const express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contacts');
const router = express.Router();

router.get('/', (req, res, next) => {
    Contact.find()
      .populate('group')
      .then(contacts => {
        res.status(200).json({
            message: 'Contacts fetched successfully!',
            contacts: contacts
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });


router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");
  
    console.log(req.body)

    const contact = new Contact({
      id: maxContactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      groups: req.body.group
    });
  
    contact.save()
      .then(createdContact => {
        res.status(201).json({
          message: 'Contact added successfully',
          document: createdContact
        });
      })
      .catch(error => {
         res.status(500).json({
            message: "An error occured",
            error: error
          });
      });
  });

  router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        contact.id = req.body.id
        contact.name = req.body.name
        contact.email = req.body.email
        contact.phone = req.body.phone
        contact.imageUrl = req.body.imageUrl
        contact.groups = req.body.groups

        Contact.updateOne({ id: req.params.id }, contact)
          .then(result => {
            res.status(204).json({
              message: 'Contact updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Contact not found.',
          error: { message: 'Contact not found'}
        });
      });
  });


router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        Contact.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Contact deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Contact not found.',
          error: { document: 'Contact not found'}
        });
      });
  });


module.exports = router;