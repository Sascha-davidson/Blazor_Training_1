namespace BlazorTraining1.Models
{
    public class CitiesRepository
    {
        private static List<string> Cities = new List<string>()
        {
            "Amsterdam",
            "Alkmaar",
            "Utrecht",
            "Rotterdam",
            "Hoorn"
        };

        public static List<string> GetCities() => Cities;
    }
}
