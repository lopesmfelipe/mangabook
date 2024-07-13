const User = require('../models/userModel');
const List = require('../models/listModel');

// GET LIST BY ID
exports.getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id).populate('titles');
    if (!list) {
      return res.status(404).json({
        status: 'fail',
        message: 'List not found',
      });
    }

    res.status(200).json({
      status: 'sucess',
      data: {
        list,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Unable to find the list',
    });
  }
};

// CREATE LIST
exports.createList = async (req, res) => {
  try {
    const { name, titles, userId } = req.body;

    const newList = await List.create({
      name,
      titles,
      userId,
    });

    await User.findOneAndUpdate(
      { userId },
      { $push: { lists: newList._id } },
      { new: true, useFindAndModify: false },
    );

    res.status(201).json({
      status: 'success',
      data: {
        list: newList,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
    console.log('Error creating list', err);
  }
};

// UPDATE LIST
exports.updateList = async (req, res) => {
  try {
    const { titleId, listId } = req.body;

    const list = await List.findOne({ _id: listId });

    if (!list) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (list.titles.includes(titleId)) {
      return res.status(200).json({
        message: 'the title is already on the list',
        list: list,
      });
    }

    list.titles.push(titleId);
    await list.save();

    res.status(200).json({
      message: 'List updated succesfully',
      list: list,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
    console.log('Error creating list', err);
  }
};
