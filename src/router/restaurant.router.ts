// src/restaurant.routes.ts

import express = require('express');

const { getAllRestaurants } = require('../controller/restaurant.controller');
const router = express.Router();

/**
 * 라우팅 정의
 * 경로: '/' (메인 서버 파일에서 /api/restaurant으로 연결될 예정)
 */

// GET 요청: 레스토랑 목록 조회
router.get('/', getAllRestaurants);

module.exports = router