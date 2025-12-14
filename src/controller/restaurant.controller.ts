import type { Request, Response } from 'express';

const DUMMY_RESTAURANTS = [
    { id: 1, name: 'Best Steakhouse', cuisine: 'Western' },
    { id: 2, name: 'Sushi Express', cuisine: 'Japanese' },
];

/**
 * GET /api/restaurant 요청 처리
 * 모든 레스토랑 목록을 반환합니다.
 */
const getAllRestaurants = (req: Request, res: Response): void => {
    console.log('GET 요청: 모든 레스토랑 조회');
    
    // 비즈니스 로직: 데이터베이스에서 모든 데이터 조회
    res.status(200).json({
        message: '레스토랑 목록을 성공적으로 가져왔습니다.',
        count: DUMMY_RESTAURANTS.length,
        data: DUMMY_RESTAURANTS,
    });
};

module.exports = {
    getAllRestaurants,
}