export class PaginationManager {
  constructor(initialPage = 1) {
    this.currentPage = initialPage;
  }

  next() {
    this.currentPage++;
    return this.currentPage;
  }

  previous() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }

    return this.currentPage;
  }

  getPage() {
    return this.currentPage;
  }
}
