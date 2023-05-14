class User < ApplicationRecord
    has_many :shared
    has_secure_password
    validates :name, presence: true
    validates :email, presence: true, uniqueness: true, email: true

    before_validation :trim_whitespace

    private
  
    def trim_whitespace
        name.strip! if name.present?
        email.strip! if email.present?
        password.strip! if password.present?
    end
end
