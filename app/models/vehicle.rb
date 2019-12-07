class Vehicle < ApplicationRecord
  belongs_to :user, optional: false
# I changed this from true
  has_many :flashcards
end


