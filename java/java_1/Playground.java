import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

class Playground {

    public static void get(String uri) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(uri))
            .build();

        HttpResponse<String> response =
            client.send(request, BodyHandlers.ofString());

        System.out.println(response.body());
    }

    public static void main(String[ ] args) {
        try {
            get("https://jsonplaceholder.typicode.com/todos/1");
        } catch (Exception e) {
            System.out.println("exception");
        }
    }

}
