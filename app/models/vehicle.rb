class Vehicle < ApplicationRecord
  belongs_to :users
  has_many :flashcards
end
