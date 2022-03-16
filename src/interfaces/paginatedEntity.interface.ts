export interface PaginatedEntitiesInterface<E> {
  readonly paginatedResult: E[] | [],
  readonly totalCount: number,
}
