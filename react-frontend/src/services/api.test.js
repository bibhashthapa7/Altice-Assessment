import { getTrendingMovies, getMovieDetails, getFavorites, addFavorite, removeFavorite, isFavorite } from './api';

// Mock axios module
jest.mock('axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
    },
}));

// Import axios after mocking
import axios from 'axios';

describe('API Service', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    describe('getTrendingMovies', () => {
        it('should fetch trending movies successfully', async () => {
            const mockData = { results: [{ id: 1, title: 'Test Movie' }] };
            axios.get.mockResolvedValue({ data: mockData });

            const result = await getTrendingMovies('day');

            expect(result).toEqual(mockData);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/movies/trending/day');
        });

        it('should handle errors', async () => {
            axios.get.mockRejectedValue(new Error('API Error'));
            await expect(getTrendingMovies('day')).rejects.toThrow('API Error');
        });
    });

    describe('getMovieDetails', () => {
        it('should fetch movie details successfully', async () => {
            const mockData = { id: 1, title: 'Test Movie' };
            axios.get.mockResolvedValue({ data: mockData });

            const result = await getMovieDetails(1);

            expect(result).toEqual(mockData);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/movies/movie/1');
        });

        it('should handle errors', async () => {
            axios.get.mockRejectedValue(new Error('API Error'));
            await expect(getMovieDetails(1)).rejects.toThrow('API Error');
        });
    });

    describe('Favorites', () => {
        it('should get empty array when no favorites', () => {
            expect(getFavorites()).toEqual([]);
        });

        it('should add favorite to localStorage', () => {
            addFavorite(1);
            expect(getFavorites()).toContain(1);
        });

        it('should not add duplicate favorites', () => {
            addFavorite(1);
            addFavorite(1);
            expect(getFavorites().length).toBe(1);
        });

        it('should remove favorite from localStorage', () => {
            addFavorite(1);
            addFavorite(2);
            removeFavorite(1);
            expect(getFavorites()).not.toContain(1);
            expect(getFavorites()).toContain(2);
        });

        it('should check if movie is favorite', () => {
            expect(isFavorite(1)).toBe(false);
            addFavorite(1);
            expect(isFavorite(1)).toBe(true);
        });
    });
});