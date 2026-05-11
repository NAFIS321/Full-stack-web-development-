import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Read name using nextLine to avoid mixing nextInt and nextLine issues
        System.out.print("What is your name, sir? ");
        String name = scanner.nextLine().trim();

        // Read number as a line and parse it to avoid leftover-newline problems
        System.out.print("Enter a number: ");
        String numberLine = scanner.nextLine().trim();
        int number;
        try {
            number = Integer.parseInt(numberLine);
        } catch (NumberFormatException e) {
            System.out.println("That's not a valid integer. Exiting.");
            scanner.close();
            return;
        }

        System.out.println("Alright, your name is " + name + ". Welcome, sir!");
        System.out.println("You entered: " + number);
        scanner.close();
    }
}