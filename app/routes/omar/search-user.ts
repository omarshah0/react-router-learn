import type { Route } from './+types/search-user'

export async function loader({ request }: Route.LoaderArgs) {
  try {
    let url = new URL(request.url)
    let q = url.searchParams.get('q')

    if (!q) {
      throw new Response('Post ID is required', {
        status: 400,
        statusText: 'Bad Request',
      })
    }

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${q}`
    )

    if (!response.ok) {
      throw new Response('Failed to fetch post', {
        status: response.status,
        statusText: response.statusText,
      })
    }

    const post = (await response.json()) as {
      id: number
      userId: number
      title: string
      body: string
    }
    return post
  } catch (error) {
    if (error instanceof Response) throw error

    throw new Response('An unexpected error occurred', {
      status: 500,
      statusText: 'Internal Server Error',
    })
  }
}
