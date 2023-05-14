class SignUpNewUser
    prepend SimpleCommand
  
    def initialize(email, password, name)
      @email = email
      @password = password
      @name = name
    end
  
    def call
      userSignUp
    end
  
    private
  
    attr_accessor :email, :password, :name
  
    def userSignUp
      @user = User.new(name: name, email: email, password: password)
  
      if @user.save
        return "Sign up successful"
      else
        errors.add :invalid_form, @user.errors
        
      end
    end
  end