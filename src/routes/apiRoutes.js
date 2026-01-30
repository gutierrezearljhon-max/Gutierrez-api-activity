const express = require('express' );
const router = express. Router( ) ;
const rooms = require('../models/roomModel' ) ;

router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running",
    endpoints: {
      rooms: "/api/v1/rooms"
    }
  });
});

router.get("/rooms", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Rooms retrieved successfully",
    data: rooms
  });
});


router.post("/rooms", (req, res) => {
  const { type, price, isBooked } = req.body;

  if (!type || !price || isBooked === undefined) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
      data: null
    });
  }

  const newRoom = {
    id: rooms.length + 1,
    type,
    price,
    isBooked
  };

  rooms.push(newRoom);

  res.status(201).json({
    status: "success",
    message: "Room created successfully",
    data: newRoom
  });
});


router.put("/rooms/:id", (req, res) => {
  const roomId = parseInt(req.params.id);
  const { type, price, isBooked } = req.body;

  const roomIndex = rooms.findIndex(room => room.id === roomId);

  if (roomIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Room not found",
      data: null
    });
  }

  rooms[roomIndex] = {
    id: roomId,
    type,
    price,
    isBooked
  };

  res.status(200).json({
    status: "success",
    message: "Room updated successfully",
    data: rooms[roomIndex]
  });
});


router.delete("/rooms/:id", (req, res) => {
  const roomId = parseInt(req.params.id);
  const roomIndex = rooms.findIndex(room => room.id === roomId);

  if (roomIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Room not found",
      data: null
    });
  }

  const deletedRoom = rooms.splice(roomIndex, 1);

  res.status(200).json({
    status: "success",
    message: "Room deleted successfully",
    data: deletedRoom
  });
});

module.exports = router;
