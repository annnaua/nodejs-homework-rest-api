const { Contact } = require("../../models");

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }

  res.json({
    status: "Success",
    code: 200,
    message: "Contact updated",
    data: { contact },
  });
};

module.exports = updateContact;
