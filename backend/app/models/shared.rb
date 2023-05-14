class Shared < ApplicationRecord
    belongs_to :user
  
    validates :name, presence: true
    validates :description, presence: true
    validates :url, presence: true
  
    before_validation :trim_whitespace
    validate :validate_url_format

    private
  
    def trim_whitespace
      name.strip! if name.present?
      description.strip! if description.present?
      url.strip! if url.present?
    end
  
    def validate_url_format
      return if url.blank?
  
      uri = URI.parse(url)
      unless uri.is_a?(URI::HTTP) || uri.is_a?(URI::HTTPS)
        errors.add(:url, 'is not a valid URL')
      end
    rescue URI::InvalidURIError
      errors.add(:url, 'is not a valid URL')
    end
  end
  