const BASE_URL = "https://api.themoviedb.org/3";

export class TMDBService {
  constructor(token) {
    this.token = token;
  }

  async getTrendingMovies(page = 1) {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return response.json();
  }

  async getNewMovies(page = 1) {
    const response = await fetch(`${BASE_URL}/movie/now_playing?page=${page}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch new movies");
    }

    return response.json();
  }
}


