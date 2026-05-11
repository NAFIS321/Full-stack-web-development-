import java.util.Scanner;
public class Main1{
public static void main(String[]args){

    Scanner scanner = new Scanner(System.in);
    System.out.println("If want to still play the game theb press : Q or q");

    String reasponse = scanner.next();

   if(reasponse.equals("Q") && !reasponse.equals("q")) {
    System.out.println( "YOU are still playing :");
} else {
    System.out.println("you quit the game");
}





}

}


