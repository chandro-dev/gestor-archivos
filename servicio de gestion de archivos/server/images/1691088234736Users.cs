using jwt.models;

namespace jwt.constantes
{
    public class Users
{
        public static List<user> _users { get; set; }   


    public Users() {
            _users = new List<user>();
            _users.Add(new user
            {
                firstName = "alejo",
                emailAdrees = "alejo@gmail.com",
                lastName = "carretero",
                rol = "admin",
                password = "password",
                userName = "chandro",
            }
            );
            _users.Add(new user
            {
                firstName = "lina",
                emailAdrees = "lina@gmail.com",
                lastName = "barbosa",
                rol = "vendedor",
                password = "password",
                userName = "cachaca",
            }
);
        }
 
}
}
